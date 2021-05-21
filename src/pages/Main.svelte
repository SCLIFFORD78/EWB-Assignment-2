<script>
  import {title, subTitle, navBar, welcomeBar} from "../stores"
  import hive from "/src/assets/beehive.jpg";
  import {getContext} from "svelte";
  const hiveTracker = getContext("HiveTracker");

  title.set("Hive Tracker App");
  subTitle.set("Sign up or Log in");

  navBar.set({
    bar: welcomeBar
  });
  hiveTracker.logout();
</script>

<div class="uk-container uk-container uk-container-small uk-margin">
  <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-auto@m">
      <img width="300" src="{hive}" alt="homer">
    </div>
    <div class="uk-width-expand@m">
      <h2 class="uk-heading-small uk-heading-divider">Help track hive locations</h2>
      <h2 class="uk-heading-small uk-heading-divider">Help track hive Numbers</h2>
      <h2 class="uk-heading-small uk-heading-divider">Help track hive Quality</h2>
    </div>
  </div>
</div>

