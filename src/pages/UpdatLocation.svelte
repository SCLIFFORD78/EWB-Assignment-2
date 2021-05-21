<script>
  import "leaflet/dist/leaflet.css";
  import { mainBar, navBar, subTitle, title } from "../stores";
  import HiveForm from "../components/HiveForm.svelte";
  import { LeafletMap } from "../services/leaflet-map";
  import { getContext, onMount } from "svelte";
  import Coordinates from "../components/Coordinates.svelte";

  const hiveTracker = getContext("HiveTracker");

  let latitude = 0;
  let longtitude = 0;
  let selectedHive = {};
  let success;
  let buttonVal = "UPDATE HIVE LOCATION"

  title.set("Hive Tracker App.");
  subTitle.set("Register a Hive");
  navBar.set({
    bar: mainBar,
  });

  let map;
  let pos;
  onMount(async () => {
    selectedHive = await hiveTracker.selectedHive[0];
    if (selectedHive) {
      latitude = selectedHive.latitude;
      longtitude = selectedHive.longtitude;
    }
    const mapConfig = {
      location: { lat: latitude, lng: longtitude },
      zoom: 11,
      minZoom: 7,
    };
    map = new LeafletMap("hive-map", mapConfig, "Terrain");
    map.showZoomControl();
    map.showLayerControl();
    const hiveStr = `Hive No.${selectedHive.hiveNumber.toString()}`;

    pos = map.addMarker(
      { lat: latitude, lng: longtitude },
      hiveStr,
      "Hives",
      true
    );
  });

  function dispLoc(){
    latitude = pos.location.lat;
    longtitude = pos.location.lng;
  };


  async function move() {
    latitude = pos.location.lat;
    longtitude = pos.location.lng;
    success = await hiveTracker.updateLocation(
      selectedHive._id,
      latitude,
      longtitude
    );
    if (success){
      console.log("Update Successful")
    }
  }
</script>

<div class="uk-container uk-margin  uk-container-large ">
  <div
    class="uk-card uk-card-default uk-card-body  uk-box-shadow-large uk-width-1-1"
  >
    <div
      id="hive-map"
      class="ui embed uk-margin uk-card-hover"
      style="height:450px"
      on:click={dispLoc} 
 />
  </div>
  <class class="uk-container uk-margin  uk-container-large" />
  <div>
    <Coordinates bind:latitude bind:longtitude />
  </div>
  <button
    class="submit uk-button uk-button-primary uk-margin uk-button-large uk-width-1-1"
    on:click={move}
    >{#if  success }
      Hive location succesfully updated / click again to update
      {:else}
      {buttonVal}
    {/if}</button
  >
</div>
