<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSession } from '~/composable/useSession';

const { user, loadSession } = useSession();
const route = useRoute();
const router = useRouter();
const terminalInput = ref('');
const terminalLines = ref([]);
const displayText = "Hello, this is a simulated terminal. Type /help for commands.";
const MAX_CHARS = 100;
let interrupted = false;
let availableEnigmas = []; 

const fetchCurrentEnigma = async () => {
  try {
    const id = route.params.id;
    if (!id) {
      return null;
    }
    const response = await $fetch(`/api/enigmes/${id}`);
    console.log(response);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch enigma:', error);
    return null;
  }
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
        terminalLines.value.push(`${cmd}: ${info.description}`);
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
        terminalLines.value.push('No dialog found.');
      }
    }
  },
  '/available': {
    description: 'Show available enigmas for the current user',
    action: async () => {
      if (user.value) {
        const userData = await fetchUser(user.value.username);  
        if (userData && userData.unlockedEnigmas) {
          availableEnigmas = userData.unlockedEnigmas.filter(enigma => enigma.etat.toLowerCase() === 'available');
          if (availableEnigmas.length > 0) {
            availableEnigmas.forEach((enigma, index) => {
              terminalLines.value.push(`${index + 1} - ${enigma.titre}, Difficulty: ${enigma.niveauDifficulte}`);
            });
          } else {
            terminalLines.value.push('No available enigmas found.');
          }
        } else {
          terminalLines.value.push('No enigmas found for the user.');
        }
      } else {
        terminalLines.value.push('No user is currently logged in.');
      }
    }
  },
  '/go_to': {
    description: 'Go to the enigma with the specified name or index',
    action: async (arg) => {
      let enigmaName = arg;
      const index = parseInt(arg, 10);
      if (!isNaN(index) && index > 0 && index <= availableEnigmas.length) {
        enigmaName = availableEnigmas[index - 1].titre;
      }
      const enigma = await fetchEnigmaByName(enigmaName);
      if (enigma && enigma._id) {
        router.push(`/enigme/${enigma._id}`);
      } else {
        terminalLines.value.push('Enigma not found.');
      }
    }
  },
  '/clear': {
    description: 'Clear terminal',
    action: () => terminalLines.value = []
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

const handleEnter = () => {
  const input = terminalInput.value.trim();
  if (input !== '') {
    terminalInput.value = '';
    if (!executeCommand(input)) {
      terminalLines.value.push(input);
    }
  }
  if (terminalLines.value.length > 5) {
    terminalLines.value.shift();
  }
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

onMounted(() => {
  loadSession();
  typeText(displayText);
});
</script>

<template>
  <div class="flex justify-center mb-12">
    <div class="bg-slate-950 border p-4 rounded w-screen mx-16 h-52 font-code text-xl relative break-all overflow-y-auto" id="terminal">
      <p v-for="line in terminalLines" :key="line" class="text-slate-50">> {{ line }}</p>
      <p class="text-slate-50">> {{ terminalInput }}<span class="blinking-cursor">_</span></p>
      <input 
        v-model="terminalInput" 
        @keydown.enter="handleEnter" 
        class="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
        :maxlength="MAX_CHARS"
        autofocus
      />
    </div>
  </div>
</template>

<style scoped>
.blinking-cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>