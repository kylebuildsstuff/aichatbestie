<script>
  import { onMount } from 'svelte';

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = () => {
    console.log('start');
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      mediaRecorder.start();
    });
  };

  const stopRecording = () => {
    console.log('stop');
    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });
    mediaRecorder.stop();
  };

  onMount(() => {
    // Component is mounted
  });
</script>

<button on:click={startRecording}>Start recording</button>
<button on:click={stopRecording}>Stop recording</button>
