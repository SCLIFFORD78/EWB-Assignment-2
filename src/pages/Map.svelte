<script>
  import 'leaflet/dist/leaflet.css';
  import {mainBar, navBar, subTitle, title} from "../stores"
  import {LeafletMap} from '../services/leaflet-map';
  import {getContext, onMount} from "svelte";
  import { push } from "svelte-spa-router";
  import Filter from "../components/Filter.svelte";

  const hiveTracker = getContext("HiveTracker");

  let latitude= 52.05102;
  let longtitude= -9.6871;
  let hives;
  let marker;
  export let filter = [];
  export let match;

  let map;

  onMount(async () => {
    const mapConfig = {
      location: {lat: latitude, lng: longtitude},
      zoom: 11,
      minZoom: 1,
    };
    map = new LeafletMap("hive-map", mapConfig, 'Terrain');
    //map.addLayerGroup('Hives');
    map.showZoomControl();
    
    hives = await hiveTracker.getHives();
    hives.forEach(hive=>{
      const hiveStr = `Hive No.${hive.hiveNumber.toString()}`;
      map.addLayerGroup(hive.hiveType);
      marker = map.addMarker({lat: hive.latitude, lng: hive.longtitude}, hiveStr, hive.hiveType);

    });
    map.showLayerControl();
  });

  function expFilter(){
    console.log("filtered", match);
    //map.clearHives("Hives");
  /*   map.addLayerGroup(match);
    map.showLayerControl();
    filter.forEach(hive=>{
      console.log(hive);
      const hiveStr = `Hive No.${hive.hiveNumber.toString()}`;
      marker = map.addMarker({lat: hive.latitude, lng: hive.longtitude}, hiveStr, match);

    }); */
  }

  title.set("Hive Tracker.");
  subTitle.set("Map of all Hives");
  navBar.set({
    bar: mainBar
  });
</script>

<div class="uk-container uk-margin  uk-container-large " uk-grid>
  <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-1-1">
    <div id="hive-map" class="ui embed" style="height:800px"></div>
    {#if true == false}
    <Filter {expFilter} bind:filter={filter} bind:match={match} />
    {/if}
  </div>
</div>


