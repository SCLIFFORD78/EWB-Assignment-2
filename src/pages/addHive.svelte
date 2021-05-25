<script>
  import "leaflet/dist/leaflet.css";
  import { mainBar, navBar, subTitle, title } from "../stores";
  import HiveForm from "../components/HiveForm.svelte";
  import { LeafletMap } from "../services/leaflet-map";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  

  export let latitude = 52.05102;
  export let longtitude = -9.6871;
  let pos;

  let map;
  onMount(async () => {
    const mapConfig = {
      location: { lat: latitude, lng: longtitude },
      zoom: 11,
      minZoom: 7,
    };
    map = new LeafletMap("hive-map", mapConfig, "Terrain");
    map.showZoomControl();
    pos = map.addMarker(
      { lat: latitude, lng: longtitude },
      "",
      "Hives",
      true
    );
  });
  function dispLoc(){
    console.log(pos);
    latitude = pos.location.lat;
    longtitude = pos.location.lng;
  };

  title.set("Hive Tracker App.");
  subTitle.set("Register a Hive");
  navBar.set({
    bar: mainBar,
  });

  function justAddedHive(hive) {
    //const hiveStr = `Hive No.${hive.hiveNumber.toString()}`;
    map.addMarker({ lat: latitude, lng: longtitude } /*, hiveStr*/);
    map.moveTo(12, { lat: latitude, lng: longtitude });
    push("/Map")
  }
</script>

<div class="uk-container uk-margin  uk-container-large ">
  <div
    class="uk-card uk-card-default uk-card-body  uk-box-shadow-large uk-width-1-1"
  >
    <div id="hive-map" class="ui embed uk-margin uk-card-hover" style="height:450px" on:click={dispLoc} />
  </div>
  <div class="uk-container uk-margin  uk-container-large">
    <HiveForm {justAddedHive} bind:latitude={latitude} bind:longtitude={longtitude} />
  </div>
</div>
