<script>
  //import "leaflet/dist/leaflet.css";
  import { mainBar, navBar, subTitle, title } from "../stores";
  import { LeafletMap } from "../services/leaflet-map";
  import { getContext, onMount } from "svelte";
  import Coordinates from "../components/Coordinates.svelte";

  const hiveTracker = getContext("HiveTracker");

  let latitude = 0;
  let longtitude = 0;
  let selectedHive = {};
  let successMove = false;
  let buttonVal = "UPDATE HIVE LOCATION"
  let errorMessage = "";

  title.set("Hive Tracker App.");
  subTitle.set("Update Hive Location");
  navBar.set({
    bar: mainBar,
  });

  let map;
  let pos;
  onMount(async () => {
    selectedHive = await hiveTracker.selectedHive[0];
    if (selectedHive) {
      latitude = selectedHive.location.lat;
      longtitude = selectedHive.location.lng;
    }
    const mapConfig = {
      location: { lat: latitude, lng: longtitude },
      zoom: 12,
      minZoom: 4,
    };
    map = new LeafletMap("hive-map", mapConfig, "Terrain");
    map.showZoomControl();
    map.showLayerControl();
    const hiveStr = `Hive No.${selectedHive.fbId.toString()}`;

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
    successMove = false;
    errorMessage = "";
  };


  async function move() {
    latitude = pos.location.lat;
    longtitude = pos.location.lng;
    var success = await hiveTracker.updateLocation(
      selectedHive.fbId,
      latitude,
      longtitude
    );
    if (success){
      console.log("Update Successful")
      errorMessage = "Location Update Successful !!"
      successMove = true;
      selectedHive = await hiveTracker.selectedHive[0];
    }else{
      errorMessage = "Location Update not successful - error occured !"
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
  {#if errorMessage}
      <div class="uk-text-center uk-text-small uk-text-danger">
        {errorMessage}
      </div>
  {/if}
  <div>
    <Coordinates bind:latitude bind:longtitude />
  </div>
  <button
    class="submit uk-button uk-button-primary uk-margin uk-button-large uk-width-1-1"
    on:click={move}
    >{#if  successMove }
      Hive location succesfully updated / click again to update
      {:else}
      {buttonVal}
    {/if}</button
  >
</div>
