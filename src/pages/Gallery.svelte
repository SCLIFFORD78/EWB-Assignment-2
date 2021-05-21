<script>
  import { mainBar, navBar, subTitle, title } from "../stores";
  import { getContext, onMount } from "svelte";
  const hiveTracker = getContext("HiveTracker");

  let hive = [];
  let allImages = [];

  onMount(async () => {
    hive = hiveTracker.selectedHive[0];
    title.set("Hive Tracker App");
    subTitle.set("Hive " + hive.hiveNumber + " Images");
    navBar.set({
      bar: mainBar,
    });
    try {
      allImages = await hiveTracker.gallery(hive._id);
    } catch (error) {
      console.log(error);
    }
    allImages.forEach(image=>{
      console.log(image);

    });

  });

  async function deleteImage(image) {
    const id = image.target.value;
    console.log(id);
    const delPic = await hiveTracker.deleteImage(id);
    const test = document.getElementById("pid");
    console.log("testing for butter" + test);
  }
</script>

<div class="uk-container uk-padding-small">
  <div
    class="uk-child-width-1-3@s uk-flex uk-flex-center"
    uk-grid
    uk-height-match="target: .uk-card"
  >
    {#if allImages}
      {#each allImages as image}
        <div>
          <div
            class="uk-card uk-card-default uk-card-small uk-text-center uk-text-baseline uk-animation-scale-up"
          >
            <div class="uk-card-media-top">
              <img src={image.url} />
            </div>
            <div>
              <div class="uk-card-footer">
              <button on:click={deleteImage} on:change value={image.public_id}><span uk-icon="icon: trash" /></button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
