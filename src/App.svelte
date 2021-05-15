<script>
  import {onMount} from 'svelte'
  import HiveList from "./HiveList.svelte"

  const url = `http://localhost:4000/api/hives`;
  let hiveList;
  onMount(async () => {
    const response = await fetch(url)
    hiveList = await response.json();
  })
</script>
<div class="uk-container">
  <h1> Donation Client Application </h1>
  <HiveList hiveList="{hiveList}"/>
</div>
