<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { user } from "../stores";

  const hiveTracker = getContext("HiveTracker");
  let allUsers = [];

  onMount(async () => {
    allUsers = await hiveTracker.getUsers();
    console.log(allUsers[0]);
  });

  async function save() {
    let success = await hiveTracker.updateSettings(
      firstName,
      lastName,
      email,
      password,
      $user._id
    );
    if (success) {
      message = "Settings updated";
    } else {
      message = "Error Trying to save settings";
    }
  }

  async function toggleAdmin(id) {
    const response = await hiveTracker.toggleAdmin(id.target.value);
    console.log("Update Admin Rights: ");
    console.log(response);
    allUsers = await hiveTracker.getUsers();
  };

  async function deleteOneUser(id) {
    const userHives = await hiveTracker.getHiveByOwner(id.target.value);
    if (userHives) {
      for (let index = 0; index < userHives.length; index++) {
        const removeHives = await hiveTracker.deleteOneHive(userHives[index]._id);
        console.log("User hive removed before deleting account: " + removeHives);
      }
    }
    
    const response = await hiveTracker.deleteOneUser(id.target.value);
    console.log("Delete user :" + response.statusText);
    allUsers = await hiveTracker.getUsers();
  };


</script>

<div
  class="uk-margin uk-width-3xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
>
  <table class="uk-table">
    <caption><h2> Member Accounts</h2> </caption>
    <thead class="uk-text-center">
      <th>Member No.</th>
      <th>email</th>
      <th>Admin</th>
      <th>Name</th>
      <th>Actions</th>
    </thead>
    <tbody class="uk-text-left">
      {#each allUsers as user}
        <tr>
          <td> {user.memberNumber} </td>
          <td> {user.email} </td>
          <td> {user.admin} </td>
          <td> {user.firstName} {user.lastName} </td>
          <td>
            <div class="uk-column-1-2">
              <div class="uk-margin">
                <button
                  name="id"
                  class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
                  on:click={toggleAdmin}
                  onclick="return confirm('Are you sure you want to update User Admin Rights?')"
                  value={user._id}
                  >Admin
                </button>
              </div>


                <div class="uk-margin">
                  <button
                    class="uk-button uk-button-danger uk-button-small uk-width-1-1"
                    on:click={deleteOneUser}
                    onclick="return confirm('Are you sure you want to DELETE member\nCANNOT be reversed?')"
                    value={user._id}
                    >Delete
                  </button>
                </div>

            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
