<script>
  import {setContext} from "svelte";
  import {HiveTracker} from "./services/Hive-Tracker";
  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Hives from "./pages/Hives.svelte";
  import addHive from "./pages/addHive.svelte";
  import Analysis from "./pages/Analysis.svelte";
  import Settings from "./pages/Settings.svelte";
  import Map from "./pages/Map.svelte"
  import HiveDetail from "./pages/HiveDetail.svelte";
  import Navigator from "./components/Navigator.svelte";
  import Router from "svelte-spa-router";
  import UpdateLocation from "./pages/UpdatLocation.svelte";

  setContext("HiveTracker", new HiveTracker("http://localhost:4000"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/hives": Hives,
    "/donate": addHive,
    "/map": Map,
    "/analysis": Analysis,
    "/settings": Settings,
    "/logout": Main,
    "/HiveDetail": HiveDetail,
    "/updateLocation": UpdateLocation
  }
</script>

<div class="uk-container">
  <Navigator/>
  <Router {routes}/>
</div>
