<script
  src="https://upload-widget.cloudinary.com/global/all.js"
  type="text/javascript">
  import { user } from "../stores";

  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";

  const hiveTracker = getContext("HiveTracker");

  export let hive = hiveTracker.selectedHive[0];
  console.log(hive)
  let errorMessage ="";
  let comment = "";
  let myWidget;
  let errorGallery = false;
  

  onMount(async () => {
    errorGallery = false
    hive = hiveTracker.selectedHive[0];
    console.log(hive)
    myWidget = cloudinary.createUploadWidget({
    cloudName: 'digabwjfx',
    uploadPreset: hive.fbId
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        errorGallery = false;
      }
    }
    );
  });

  async function widgetOpen(){
    if (!errorGallery) {
      console.log("trying to open widget")
      myWidget.open();
    } else {
      errorMessage = "!! Gallery Server offline."
    }
    
  };

  async function addHiveComment() {
    const success = await hiveTracker.addHiveComment(hive.fbId, comment);
    if (success) {
      hive = await hiveTracker.getHive(hive.fbId);
    } else {
      errorMessage = "Comment not added - error occurred";
    }
  };

  async function deleteHiveComment(comment_id) {
    const _id = comment_id.target.value;
    const success = await hiveTracker.deleteHiveComment(hive.fbId, _id);
    if (success) {
      hive = await hiveTracker.getHive(hive.fbId);
    } else {
      errorMessage = "Comment not removed - error occurred";
    }
  };

  async function deleteOneHive() {
    var deleteHive = false;
    const loggedInUser = await hiveTracker.getUserByEmail($user.email);
    const loggedInUserHives = await hiveTracker.getHiveByOwner(loggedInUser._id);
    loggedInUserHives.forEach(loggedInUserHive => {
      if (loggedInUserHive._id == hive._id) {
        deleteHive = true;
        
      }
    });
    if (deleteHive ||loggedInUser.admin) {
      const success = await hiveTracker.deleteOneHive(hive.fbId);
    if (success) {
      push("/hives")
    } else {
      errorMessage = "Deletion not completed - some error occurred";
    }
    }else{
      errorMessage = "!! Hive can only be deleted by Owner OR Admin member"
    }
    
  };

  function updateLocation(){
    push("/updateLocation");
  }

  function gallery(){
    if (!errorGallery) {
      push("/gallery");
    } else {
      errorMessage = "!!  Gallery server offline"
    }
    
  }
</script>

<div
  class="uk-margin uk-width-2xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large uk-card-hover"
>
    {#if errorMessage}
      <div class="uk-text-center uk-text-small uk-text-danger">
        {errorMessage}
      </div>
    {/if}

    <div class="uk-margin">
      <textarea
        class="uk-textarea"
        rows="10"
        placeholder="Comments"
        name="details"
        bind:value={comment}
        
      />
    </div>
    <div class="uk-margin">
      <button on:click={addHiveComment}
        class="submit uk-button uk-button-primary uk-button-large uk-width-1-1"
        >Submit comments
      </button>
    </div>

  <div class="uk-column-1-4">

      <div class="uk-margin">
        <button 
          class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
          on:click={gallery}
          >edit Gallery
        </button>
      </div>
      <div class="uk-margin">
        <button class="uk-button uk-button-danger uk-button-small uk-width-1-1"
        on:click={deleteOneHive}
        onclick="return confirm('Are you sure you want to delete hive CANNOT be undone!')"
          >Delete Hive
        </button>

      </div>
    <button
      on:click={widgetOpen}
      class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
      >Upload image</button
    >



    
      <div class="uk-margin">
        <button
          class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
          on:click={updateLocation}
          >edit location</button
        >

      </div>

    
  </div>
  <table class="uk-table">
    <caption>
      RECORDS
    </caption>
    <thead class="uk-text-left">
      <th>Date Logged</th>
      <th>Comments</th>
      <th>Delete Comment</th>

    </thead>
    <tbody class="uk-text-left">
      {#if hive}
        {#each hive.details as detail}

        <tr>
          <td> {detail.dateLogged} </td>
          <td> {detail.comments} </td>
          <td>

              <div class="uk-margin">
                
                <button  class="uk-button uk-button-danger uk-button-small uk-width-1-1"
                on:click={deleteHiveComment} value={detail.fbId}
                onclick="return confirm('Are you sure you want to delete comment?')"
                  >Delete Comment
                </button>

              </div>
          </td>
        </tr>

        {/each}
      {/if}
    </tbody>
  </table>
</div>
