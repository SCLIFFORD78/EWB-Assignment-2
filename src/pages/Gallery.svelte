<script>
  import { mainBar, navBar, subTitle, title } from "../stores";
  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  const hiveTracker = getContext("HiveTracker");

  let hive = [];
  let allImages = [];
  let images = [];
  let errorMessage;

  onMount(async () => {
    hive = hiveTracker.selectedHive[0];
    title.set("Hive Tracker App");
    subTitle.set("Hive " + hive.fbId + " Images");
    navBar.set({
      bar: mainBar,
    });
    try {
      allImages = await hiveTracker.gallery(hive.fbId);

    } catch (error) {
      console.log(error);
    }

  });

  async function deleteImage() {
    try {
      for (let i = 0; i < images.length; i++) {
        await hiveTracker.deleteImage(images[i]);
      }
    } catch (error) {
      errorMessage = error;
    };
    images = [];
    push("/HiveDetail")


  }

  function imagesForDeletion(id) {
    var pic = id.target.value;
    if(images.length > 0){
      if(images.indexOf(pic) == -1){
        images.push(pic)

      }else{
        removeItemAll(images, pic);
      }
    }else{
      images.push(pic)
    }

  };

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  };
  function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

  function backButton() {
    push("/HiveDetail");
  }
</script>

<div class="uk-container uk-padding-small">
  <div class="uk-margin">
    <button
      class="uk-button uk-button uk-button-large uk-width-1-1"
      on:click={backButton}
      >Back To Hive Details
    </button>
  </div>
  {#if errorMessage}
    <div class="uk-text-center uk-text-small uk-text-danger">
      {errorMessage}
    </div>
  {/if}
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
                <input
                  value={image.public_id}
                  on:click={imagesForDeletion}
                  type="checkbox"
                />
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="uk-margin">
    <button
        class="uk-button uk-button-danger uk-button-large uk-width-1-1"
        on:click={deleteImage}
        onclick="return confirm('Are you sure you want to delete image(s)?')"
        ><span uk-icon="icon: trash" />
      </button>
  </div>
</div>




      
