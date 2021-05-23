<script>
  import { mainBar, navBar, subTitle, title } from "../stores";
  import Chart from "svelte-frappe-charts";
  import { getContext, onMount } from "svelte";
  import AdminSettingsForm from "../components/AdminSettingsForm.svelte";

  const hiveTracker = getContext("HiveTracker");

  title.set("Hive Tracker App.");
  subTitle.set("Analysis");
  navBar.set({
    bar: mainBar,
  });

  let hives = [];
  let users = [];
  let hiveTypeData = {
    labels: ["Super", "National", "Langstroth", "Top Bar", "Warré"],
    datasets: [
      {
        values: [0, 0, 0, 0, 0],
      },
    ],
  };

  let userData = {
    labels: ["Admin", "User"],
    datasets: [
      {
        values: [0, 0],
      },
    ],
  };

  let donorData = {
    labels: [],
    datasets: [
      {
        values: [],
      },
    ],
  };
  async function refreshCharts() {
    let hiveList = await hiveTracker.getHives();

    let sumSuper = 0;
    let sumNational = 0;
    let sumLangstroth = 0;
    let sumTopBar = 0;
    let sumWarré = 0;

    hiveList.forEach((hive) => {
      if (hive.hiveType == "Super") {
        sumSuper++;
      } else if (hive.hiveType == "National") {
        sumNational++;
      } else if (hive.hiveType == "Langstroth") {
        sumLangstroth++;
      } else if (hive.hiveType == "Top Bar") {
        sumTopBar++;
      } else {
        sumWarré++;
      }
    });
    hiveTypeData.datasets[0].values[0] = sumSuper;
    hiveTypeData.datasets[0].values[1] = sumNational;
    hiveTypeData.datasets[0].values[2] = sumLangstroth;
    hiveTypeData.datasets[0].values[3] = sumTopBar;
    hiveTypeData.datasets[0].values[4] = sumWarré;

    let sumAdmin = 0;
    let sumUser = 0;
    users.forEach((user) => {
      if (user.admin) {
        sumAdmin++;
      } else {
        sumUser++;
      }
      userData.datasets[0].values[0] = sumAdmin;
      userData.datasets[0].values[1] = sumUser;
    });
  }


  onMount(async () => {
    hives = await hiveTracker.getHives();
    users = await hiveTracker.getUsers();
    await refreshCharts();
  });
</script>

<div class="uk-child-width-expand@s uk-text-center uk-height-large uk-align-center" >
  <div>
    <div
      class="uk-card uk-card-default uk-card-large uk-card-body uk-box-shadow-large uk-width-2xlarge uk-margin uk-height- uk-align-center "
    >
      <h3>Hive Types</h3>
      <Chart data={hiveTypeData} type="bar" />
    </div>
  </div>
</div>
<div class="uk-child-width-expand@s uk-text-center uk-height-large uk-align-center">
  <div>
    <div
      class="uk-card uk-card-default uk-card-large uk-card-body uk-box-shadow-large uk-width-2xlarge uk-margin uk-height-large uk-align-center"
    >
      <h3>Types of Registered Users</h3>
      <Chart data={userData} type="pie" />
    </div>
  </div>
</div>

