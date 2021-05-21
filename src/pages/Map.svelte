<script>
  import 'leaflet/dist/leaflet.css';
  import {mainBar, navBar, subTitle, title} from "../stores"
  import {LeafletMap} from '../services/leaflet-map';
  import {getContext, onMount} from "svelte";
  import { push } from "svelte-spa-router";

  const hiveTracker = getContext("HiveTracker");

  let latitude= 52.05102;
  let longtitude= -9.6871;

  let map;

  onMount(async () => {
    const mapConfig = {
      location: {lat: latitude, lng: longtitude},
      zoom: 11,
      minZoom: 1,
    };
    map = new LeafletMap("hive-map", mapConfig, 'Terrain');
    map.addLayerGroup('Hives');
    map.showZoomControl();
    map.showLayerControl();
    const hives = await hiveTracker.getHives();
    console.log(hives);
    hives.forEach(hive=>{
      const hiveStr = `Hive No.${hive.hiveNumber.toString()}`;
      map.addMarker({lat: hive.latitude, lng: hive.longtitude}, hiveStr, 'Hives');

    });
  });
  function selectHive(){

    push("/hives")


  }

  title.set("Hive Tracker.");
  subTitle.set("Map of all Hives");
  navBar.set({
    bar: mainBar
  });
</script>

<div class="uk-container uk-margin  uk-container-large " uk-grid>
  <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-1-1">
    <div id="hive-map" class="ui embed" style="height:800px" on:click={selectHive}></div>
  </div>
</div>


