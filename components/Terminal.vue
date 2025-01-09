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
        typeText(enigma.description);
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
    action: () => terminalLines.value = []
  },
  '/try': {
    description: 'Try a solution for the current enigma',
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

      if (arg === enigma.solution) { 
        clearInterval(timerInterval);
        terminalLines.value.push(enigma.completionMessage);

        if (user.value) {
          const userData = await fetchUser(user.value.username);
          if (userData && userData.unlockedEnigmas) {
            const enigmaIndex = userData.unlockedEnigmas.findIndex(e => e.title === enigma.title);
            if (enigmaIndex !== -1) {
              if (userData.unlockedEnigmas[enigmaIndex].state !== 'solved') { // Vérifie si l'énigme n'est pas déjà résolue
                userData.unlockedEnigmas[enigmaIndex].state = 'solved';
                userData.unlockedEnigmas[enigmaIndex].completionTime = timer;
                userData.unlockedEnigmas[enigmaIndex].dateCompletion = new Date();
                userData.pointsEarned = (userData.pointsEarned || 0) + (enigma.pointsAwarded || 0); 
                await $fetch(`/api/utilisateurs/${user.value.username}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    unlockedEnigmas: userData.unlockedEnigmas,
                    pointsEarend: userData.pointsEarend
                  })
                });
              } 
            }
            if (Array.isArray(enigma.unlocksEnigmas) && enigma.unlocksEnigmas.length > 0) { // débloque les potentielles enigmes suivantes
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
              await $fetch(`/api/utilisateurs/${user.value.username}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
              });
            }
          }
        }
      } else {
        terminalLines.value.push('Wrong. Try again!');
        const userData = await fetchUser(user.value.username);
        const enigmaIndex = userData.unlockedEnigmas.findIndex(e => e.title === enigma.title);
        if (userData.unlockedEnigmas[enigmaIndex].state !== 'solved') {
          userData.unlockedEnigmas[enigmaIndex].numberOfTry += 1;
          await $fetch(`/api/utilisateurs/${user.value.username}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    unlockedEnigmas: userData.unlockedEnigmas
                  })
                });
        }
      }
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
  }
};

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
  await loadSession();
  await fetchUnlockedEnigmas(user);
  await fetchEnigmaDescription();
  typeText(enigmaDescription.value);
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