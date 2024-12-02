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

<script setup>
const terminalInput = ref('');
const terminalLines = ref([]);
const displayText = "Hello, this is a simulated terminal. Type /help for commands.";
const storyText = "Once upon a time in a digital realm, there was a curious terminal...";
const MAX_CHARS = 100;
let interrupted = false;

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
  '/story': {
    description: 'Tell a story',
    action: () => typeText(storyText)
  },
  '/clear': {
    description: 'Clear terminal',
    action: () => terminalLines.value = []
  }
};

const executeCommand = (input) => {
  const command = commands[input];
  if (command) {
    command.action();
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
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  document.removeEventListener('keydown', handleCtrlC);
  handleEnter();
};

onMounted(() => {
  typeText(displayText);
});
</script>

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