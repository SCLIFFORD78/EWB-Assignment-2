<script>
    import {onMount, getContext} from 'svelte'
    const hiveTracker = getContext("EWB Assignment 1");
  
    let hiveList;
    onMount(async () => {
      hiveList = await hiveTracker.getHives()
    })
  </script>

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
      {#if hiveList}
        {#each hiveList as hive}
          <tr>
            <td>{hive.hiveNumber}</td>
            <td>{hive.hiveType}</td>
            <td> {hive.owner.firstName} {hive.owner.lastName} </td>
            <td>
              <button
                class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
                >Select
              </button>
              <input
                type="hidden"
                class="uk-button uk-button-primary"
                value={hive._id}
                name="id"
              />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
