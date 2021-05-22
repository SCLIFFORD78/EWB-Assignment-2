<script lang="ts">
  import { mainBar, navBar, subTitle, title } from "../stores";
  import hive from "/src/assets/beehive.jpg";
  import SettingsForm from "../components/SettingsForm.svelte";
  import AdminSettingsForm from "../components/AdminSettingsForm.svelte";
  import { user } from "../stores";
  import { onMount, getContext } from "svelte";

  const hiveTracker = getContext("HiveTracker");

  title.set("Hive Tracker App");
  subTitle.set("Edit and then save your settings");
  let loggedUser;

  onMount(async () => {
    const loggedInUser = await hiveTracker.getUserByEmail($user.email);
    if (loggedInUser.admin == true) {
      loggedUser = true;
    } else {
      loggedUser = false;
    }
  });

  navBar.set({
    bar: mainBar,
  });
</script>

<div class="uk-flex uk-flex-center uk-flex-top uk-grid-large uk-column-1-2" uk-grid>
  {#if loggedUser == false}
  <div class="uk-child-width-large uk-text-center">
    <AdminSettingsForm />
  </div>
  {:else}
    <div class="uk-width-1-2@m ">
      <img width="300" src={hive} alt="hive" />
    </div>
  {/if}
  <div class="uk-width-1-2@m">
    <div
      class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge"
    >
      <h3 class="uk-card-title uk-text-center">
        Edit any entry and press save
      </h3>

      <SettingsForm />
    </div>
  </div>
</div>
