<script>
  import {mainBar, navBar, subTitle, title} from "../stores"
  import Chart from 'svelte-frappe-charts';
  import {getContext, onMount} from "svelte";
  import addHiveForm from "../components/HiveForm.svelte";

  const hiveTracker = getContext("HiveTracker");

  title.set("Donation Services Inc.");
  subTitle.set("Analysis");
  navBar.set({
    bar: mainBar
  });

  let hives = [];
  let paymentData = {
    labels: ["super", "national"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  };

  let donationsData = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  }

  let donorData = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  }
  async function refreshCharts() {
    let donationList = await hiveTracker.getDonations();

    let sumPaypal = donationList.filter(donation => donation.method == "super").reduce((a, b) => ({amount: a.amount + b.amount}));
    paymentData.datasets[0].values[0] = sumPaypal.amount;
    let sumDirect = donationList.filter(donation => donation.method == "national").reduce((a, b) => ({amount: a.amount + b.amount}));
    paymentData.datasets[0].values[1] = sumDirect.amount;

    hives.forEach((hive, i) => {
      let total = donationList.filter(donation => donation.hive._id == hive._id).reduce((a, b) => ({amount: a.amount + b.amount}));
      donationsData.datasets[0].values[i] = total.amount;
    });

    let donors = new Map();
    donationList.forEach(donation => {donors.set(donation.donor._id, donation.donor)})
    let i = 0;
    donorData.labels = [];
    for (const [id, donor] of donors.entries()) {
      donorData.labels.push(`${donor.lastName}, ${donor.firstName}`);
      let sumaddHived = donationList.filter(donation => donation.donor._id == id).reduce((a, b) => ({amount: a.amount + b.amount}));
      donorData.datasets[0].values[i] = sumaddHived.amount;
      i++;
    }
  }

  function justaddHived() {
    refreshCharts();
  }

  onMount(async () => {
    hives = await hiveTracker.getHives();
    donationsData.labels = [];
    hives.forEach(hive => {
      donationsData.labels.push(`${hive.lastName}, ${hive.firstName}`)
    })
    await refreshCharts();
  });
</script>

<div class="uk-flex-middle uk-text-center" uk-grid>
  <div class="uk-width-1-2@m ">
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge uk-margin">
      <h3> Payment Methods </h3>
      <Chart data={paymentData} type="pie"/>
    </div>
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge uk-margin">
      <h3> Donations by Hive </h3>
      <Chart data={donationsData} type="bar"/>
    </div>
  </div>
  <div class="uk-width-1-2@m ">
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge uk-margin">
      <h3> Donations by Donor </h3>
      <Chart data={donorData} type="donut"/>
    </div>
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge uk-margin">
      <h3> Make a Donation </h3>
      <addHiveForm {justaddHived}/>
    </div>
  </div>
</div>
