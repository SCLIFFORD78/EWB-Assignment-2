<script>
  import {getContext, onMount} from 'svelte'

  const hiveTracker = getContext("HiveTracker");
 

  let hive = hiveTracker.selectedHive[0];


  onMount(async () => {

  });
  var _id = hive._id;
  const myGallery = cloudinary.galleryWidget({
    container: "#photos",
    cloudName: "digabwjfx",
    mediaAssets: [{ tag: _id }, { tag: "Home" }]    // by default mediaType: "image"
  });
  if (myGallery.mediaAssets) {
    myGallery.render();
  }
  myGallery.render();


</script>

<div id="photos"></div>
