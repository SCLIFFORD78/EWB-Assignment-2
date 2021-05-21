<script>
  import HiveList from "../components/HiveList.svelte";
  import beehive from "/src/assets/beehive.jpg";
  import {navBar, mainBar, subTitle, title} from "../stores"

  function selectedHiveInfo(hive){
    console.log(hive);
  };

  

  title.set("Hive Tracker App");
  subTitle.set("All Current Hives");
  navBar.set({
    bar: mainBar
  });

</script>

<div class="uk-text-center" uk-grid>
  <div class="uk-width-1-2@m ">
    <img width="300" src="{beehive}" alt="homer">
  </div>
  <div class="uk-width-1-2@m">
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge ">
      <HiveList {selectedHiveInfo}/>
    </div>
  </div>
</div>
