<script>
  import { onMount, getContext } from "svelte";
  import { push } from "svelte-spa-router";
  import Coordinates from "./Coordinates.svelte";
  import HiveInfo from "../components/HiveInfo.svelte";

  export let selectedHiveInfo;
  let hive = {};
  let errorMessage = "";
  let selectedType = 0;
  let type = ["All", "Super", "National", "Langstroth", "Top Bar", "Warré"];
  let filter = [];
  let hiveList;

  const hiveTracker = getContext("HiveTracker");

  async function selectedHive(hive) {
    const selectedHive = await hiveTracker.getHive(hive.target.value);
    if (selectedHive) {
      selectedHiveInfo = selectedHive;
    } else {
      errorMessage = "Hive not found!";
    }
    push("/HiveDetail");
  }

  
  onMount(async () => {
    hiveList = await hiveTracker.getHives();
    for (var i = 0; i < hiveList.length; i++) {
      var owner = await hiveTracker.getUser(hiveList[i].owner);
      if (owner) {
        hiveList[i].owner = owner.firstName.concat(" ", owner.lastName);
      }
    }
    filter = hiveList;
  });

  function select() {
    console.log(selectedType);
    filter = hiveList;
    if (hiveList) {
      
      var match;
      if (selectedType > 0) {
        filter = [];
        for (var j = 1; j < type.length; j++) {
          if (selectedType == j) {
            match = type[j];
          }
        }
        console.log(match);
        for (var i = 0; i < hiveList.length; i++) {
          if (hiveList[i].hiveType == match) {
            filter.push(hiveList[i]);
          }
        }
      }
      console.log(filter);
    }
  }
</script>

<h3 class="uk-heading-divider">Hive List</h3>
<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
  <label
    ><input
      bind:group={selectedType}
      value={0}
      class="uk-radio"
      type="radio"
      name="type"
      on:change={select}
    />
    {type[0]}
  </label><br />
  <label
    ><input
      bind:group={selectedType}
      value={1}
      class="uk-radio"
      type="radio"
      name="type"
      on:change={select}
    />
    {type[1]}
  </label><br />
  <label
    ><input
      bind:group={selectedType}
      value={2}
      class="uk-radio"
      type="radio"
      name="type"
      on:change={select}
    />
    {type[2]}
  </label><br />
  <label
    ><input
      bind:group={selectedType}
      value={3}
      class="uk-radio"
      type="radio"
      name="type"
      on:change={select}
    />
    {type[3]}
  </label><br />
  <label
    ><input
      bind:group={selectedType}
      value={4}
      class="uk-radio"
      type="radio"
      name="type"
      on:change={select}
    />
    {type[4]}
  </label><br />
  <label
    ><input
      bind:group={selectedType}
      value={5}
      class="uk-radio"
      type="radio"
      name="type"
      on:change={select}
    />
    {type[5]}
  </label><br />
</div>
<div class="uk-table uk-table-divider">
  <table class="uk-table">
    <thead>
      <th> Hive Number </th>
      <th> Category </th>
      <th> Owner </th>
      <th> Select for more info </th>
    </thead>
    <tbody class="uk-text-left">
      {#if filter}
        {#each filter as hive}
          <tr>
            <td>{hive.hiveNumber}</td>
            <td>{hive.hiveType}</td>
            <td> {hive.owner} </td>
            <td>
              <button
                class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
                on:click={selectedHive}
                value={hive._id}
                >Select
              </button>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
