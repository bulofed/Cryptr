<script setup>
import { useRouter } from 'vue-router';
import { useSession } from '~/composable/useSession';
import { useEnigma, useUnlockedEnigmas } from '~/composable/useEnigma';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const { user, loadSession } = useSession();
const { fetchCurrentEnigma } = useEnigma();
const { enigmes, fetchUnlockedEnigmas } = useUnlockedEnigmas();

const router = useRouter();
const terminalInput = ref('');
const terminalLines = ref([]);
const enigmaDescription = ref('');
const cluesUsed = ref(0);
const unlockedClues = ref([]);
const MAX_CHARS = 100;
let interrupted = false;

let timer = 0;
let timerInterval = null;

const focusInput = () => {
  nextTick(() => {
    const inputElement = document.getElementById('terminal-input');
    if (inputElement) {
      inputElement.focus();
    }
  });
};

const fetchUser = async (username) => {
  try {
    if (!username) {
      return null;
    }
    const response = await $fetch(`/api/utilisateurs/${username}`);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

const fetchEnigmaByName = async (name) => {
  try {
    const response = await $fetch(`/api/enigmes/${name}`);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch enigma by name:', error);
    return null;
  }
};

const fetchClueByName = async (name) => {
  try {
    const response = await $fetch(`/api/clues`);
    if (response.success && response.data) {
      const clue = response.data.find(clue => clue.unlockedBy.toLowerCase() === name.toLowerCase());
      return clue || null;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch clue by name:', error);
    return null;
  }
};

const postUnlockedClues = async (username, clues) => {
  try {
    const response = await $fetch(`/api/utilisateurs/${username}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unlockedClues: clues
      })
    });
    return response;
  } catch (error) {
    console.error('Failed to post unlocked clues:', error);
    return null;
  }
};

// Commands configuration
const commands = {
  '/help': {
    description: 'Show available commands',
    action: () => {
      Object.entries(commands).forEach(([cmd, info]) => {
        nextTick(terminalLines.value.push(`${cmd}: ${info.description}`));
      });
    }
  },
  
  '/desc': {
    description: 'Show current enigma description',
    action: async () => {
      const enigma = await fetchCurrentEnigma();
      if (enigma && enigma.description) {
        await typeText(enigma.description);
      } else {
        terminalLines.value.push('No enigma found.');
      }
    }
  },

  '/clear': {
    description: 'Clear terminal',
    action: () => terminalLines.value = []
  },

  '/try': {
    description: 'Try a solution for the current enigma',
    action: async (arg) => {
      if (!arg) {
        terminalLines.value.push('Usage: /try <your-solution>');
        return;
      }
      
      const enigma = await fetchCurrentEnigma();
      if (!enigma) {
        terminalLines.value.push('No active enigma found.');
        return;
      }

      const userData = await fetchUser(user.value.username);
      const enigmaIndex = userData.unlockedEnigmas.findIndex(e => e.title === enigma.title);
      const userEnigma = userData.unlockedEnigmas[enigmaIndex];
      if (userEnigma.state !== 'solved'){
        userEnigma.numberOfTry++;
        enigma.statistics.tries++;
      }

      await $fetch(`/api/enigmes/${enigma._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statistics: enigma.statistics
        })
      });

      if (arg === enigma.solution) {
        await typeText(enigma.completionMessage);
        if (userEnigma.state !== 'solved') { // Vérifie si l'énigme n'est pas déjà résolue
          enigma.statistics.averageResolutionTime = Math.round((timer + enigma.statistics.averageResolutionTime) / 2);
          console.log("Completed : ", enigma.statistics);
          enigma.statistics.completed++;
          enigma.statistics.successRate = Math.floor((enigma.statistics.completed / enigma.statistics.tries) * 100);
          await $fetch(`/api/enigmes/${enigma._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              statistics: enigma.statistics
            })
        });

          clearInterval(timerInterval);

          // userEnigma.state = 'solved';
          userEnigma.completionTime = timer;
          userEnigma.dateCompletion = new Date();
          await fetchClueByName(enigma.title).then(async (clue) => {
            if (clue) {
              await typeText('Tu as débloqué une nouvelle piste : ' + clue.title);
              await postUnlockedClues(user.value.username, clue);
            }
          });

          const calculatePoints = () => {
            let basePoints = enigma.pointsAwarded || 0;

            for (let i = 0; i < cluesUsed.value; i++) {
              basePoints *= 0.75;
            }
            
            if (userEnigma.numberOfTry === 1 && cluesUsed.value === 0) {
              basePoints *= 2;
            } else if (userEnigma.numberOfTry > 1) {
              basePoints -= userEnigma.numberOfTry * 10;
            }
            
            return basePoints > 0 ? Math.floor(basePoints) : 0;
          };
          
          const points = calculatePoints();
          userData.pointsEarned += points;
        }

        if (Array.isArray(enigma.unlocksEnigmas) && enigma.unlocksEnigmas.length > 0) {  // débloque les potentielles enigmes suivantes
          for (const enigmaId of enigma.unlocksEnigmas) {
            const newEnigma = await fetchEnigmaByName(enigmaId);
            if (newEnigma) {
              const isAlreadyUnlocked = userData.unlockedEnigmas.some(e => e.title === newEnigma.title);
              if (!isAlreadyUnlocked) {
                userData.unlockedEnigmas.push({
                  title: newEnigma.title,
                  state: 'available',
                  difficultyLevel: newEnigma.difficultyLevel
                });
              }
            }
          }
        }
      } else {
        await typeText(`Wrong. Try again! You tried ${userEnigma.numberOfTry} times so far.`);
      }

      await $fetch(`/api/utilisateurs/${user.value.username}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unlockedEnigmas: userData.unlockedEnigmas,
          pointsEarned: userData.pointsEarned
        })
      });
    }
  },

  '/go_to': {
    description: 'Go to the enigma with the specified name or index',
    action: async (arg) => {
      let enigmaName = arg;
      await fetchUnlockedEnigmas(user);
      const index = parseInt(arg, 10);
      if (!isNaN(index) && index > 0 && index <= enigmes.value.length) {
        enigmaName = enigmes.value[index - 1].title;
      }
      const enigma = await fetchEnigmaByName(enigmaName);
      if (enigma && enigma._id) {
        router.push(`/enigme/${enigma._id}`);
      } else {
        terminalLines.value.push('Enigma not found.');
      }
    }
  },

  '/inspect': {
    description: 'Inspect the current enigma',
    action: async () => {
      const enigma = await fetchCurrentEnigma();
      if (enigma) {
        terminalLines.value.push(`${enigma.textInspect}`);
      } else {
        terminalLines.value.push('No enigma found.');
      }
    }
  },

  '/clue': {
    description: 'Unlock one clue',
    action: async () => {
      const enigma = await fetchCurrentEnigma();
      if (!enigma) {
        terminalLines.value.push('No active enigma found.');
        return;
      }
      
      if (cluesUsed.value >= (enigma.clues?.length || 0)) {
        terminalLines.value.push('There are no more clues available.');
        return;
      }
      
      terminalLines.value.push(enigma.clues[cluesUsed.value]);
      cluesUsed.value++;
      console.log(`Clues used: ${cluesUsed.value}`);
    }
  },

  '/story':{
    description: 'gives the synopsis of the story',
    action:async () => {
      await typeText("narrateur : Cela faisait des mois que John Smith était dans sa quête pour retrouver le joyau perdu d'Athènes, une magnifique pierre précieuse documentée à multiples reprises à travers l'histoire, dont les mythes expliquent qu'elle disparaissait inexplicablement à la mort de son porteur, puis réapparaissait de manière tout aussi inexpliquée dans les mains de divers intellectuels à travers le monde.");
      await typeText("La pierre a inspiré de multiples légendes depuis l'antiquité, mais John n'est pas du genre superstitieux, pour lui ce saphir n'était qu'un moyen de sécuriser un beau pactole et de gagner en célébrité, rien de plus.");
      await typeText("Il tremblait d'excitation, cela faisait des décennies que la pierre n'avait pas été vue et en retraçant la vie de ses anciens détenteurs, il trouvait constamment un point commun, une visite dans une certaine région de Grèce.");
      await typeText("Après quelques jours sur place, il avait enfin trouvé ce qu'il cherchait si avidement, une entrée vers des ruines souterraines, à peine visible, couverte de végétation et sur le flanc d'une montagne.");
      await typeText("La descente fut longue et minutieuse, John déjouant des dizaines de pièges après avoir fait l'erreur d'assumer qu'aucun ne serait présent, une erreur qui lui coûta un doigt.");
      await typeText("Mais il y était enfin arrivé, il pouvait le sentir, après cette longue descente il était enfin dans une salle qui n'était non pas un long couloir sinueux, mais une large antichambre avec 5 portes en pierre face à lui.");
      await typeText("Bonne chance aventurier, c'est maintenant à vous de faire progresser notre cher John Smith dans sa quête de richesse et de gloire.");
      
    }
  }
}
const executeCommand = (input) => {
  const [command, ...args] = input.split(' ');
  const cmd = commands[command];
  if (cmd) {
    cmd.action(args.join(' '));
    return true;
  }
  return false;
};

const scrollToBottom = () => {
  nextTick(() => {
    const terminal = document.querySelector('.terminal-content');
    terminal.scrollTop = terminal.scrollHeight;
  });
};

const handleEnter = () => {
  const input = terminalInput.value.trim();
  if (input !== '') {
    terminalInput.value = '';
    if (!executeCommand(input)) {
      terminalLines.value.push(input);
    }
  }
  scrollToBottom();
};

const handleCtrlC = (e) => {
  if (e.ctrlKey && e.key === 'c') {
    interrupted = true;
  }
};

const typeText = async (text) => {
  interrupted = false;
  document.addEventListener('keydown', handleCtrlC);

  for (let i = 0; i < text.length; i++) {
    if (interrupted) {
      terminalInput.value = text; // Show full text immediately
      break;
    }
    terminalInput.value += text[i];
    await new Promise(resolve => setTimeout(resolve, 35));
  }

  document.removeEventListener('keydown', handleCtrlC);
  handleEnter();
};

const fetchEnigmaDescription = async () => {
  try {
    const enigma = await fetchCurrentEnigma();
    if (enigma && enigma.description) {
      enigmaDescription.value = enigma.description;
    } else {
      enigmaDescription.value = "No enigma description available.";
    }
  } catch (error) {
    console.error('Failed to fetch enigma description:', error);
    enigmaDescription.value = "Error fetching enigma description.";
  }
};

onMounted(async () => {
  loadSession();
  await fetchUnlockedEnigmas(user);
  await fetchEnigmaDescription();
  await typeText(enigmaDescription.value);
  timerInterval = setInterval(() => {
    timer += 1;
  }, 1000);
  document.addEventListener('keydown', handleCtrlC);
});

onUnmounted(() => {
  if (timerInterval){
    clearInterval(timerInterval);
  }
});
</script>

<template>
  <div class="bg-slate-950 border p-4 rounded mx-16 h-52 font-code text-xl relative flex flex-col justify-end">
    <div
      class="grow overflow-y-auto terminal-content z-10"
      @click="focusInput"
    >
      <p v-for="line in terminalLines" :key="line" class="text-slate-50">> {{ line }}</p>
      <p class="text-slate-50">> {{ terminalInput }}<span class="blinking-cursor">_</span></p>
    </div>
    <input 
      v-model="terminalInput"
      @keydown.enter="handleEnter"
      class="absolute bottom-0 left-0 w-full h-full opacity-0"
      :maxlength="MAX_CHARS"
      id="terminal-input"
    />
  </div>
</template>

<style scoped>
.blinking-cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style>