<script>
  import { onMount, getContext } from "svelte";
  import { push } from "svelte-spa-router";
  import Coordinates from "./Coordinates.svelte";
  import Filter from "../components/Filter.svelte";

  export let selectedHiveInfo;
  let filter = [];
  let errorMessage = "";
  let hives = [];

  const hiveTracker = getContext("HiveTracker");

  async function selectedHive(hive) {
    await hiveTracker.getHive(hive.target.value).then((selectedHive) => {
      if (selectedHive) {
        selectedHiveInfo = selectedHive;
      } else {
        errorMessage = "Hive not found!";
      }
      push("/HiveDetail");
    });
  }

  function expFilter() {
    hives = filter;
  }
</script>

<Filter {expFilter} bind:filter />
<h3 class="uk-heading-divider">Hive List</h3>

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
            <td>{hive.fbId}</td>
            <td>{hive.type}</td>
            <td> {hive.user} </td>
            <td>
              <button
                class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
                on:click={selectedHive}
                value={hive.fbId}
                >Select
              </button>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
