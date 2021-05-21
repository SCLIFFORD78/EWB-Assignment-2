<script
  src="https://upload-widget.cloudinary.com/global/all.js"
  type="text/javascript">
  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";

  const hiveTracker = getContext("HiveTracker");

  

  export let hive = hiveTracker.selectedHive[0];
  let errorMessage;


  let comment = "";
  let comment_ = "";
  let myWidget;
  

  onMount(async () => {
    hive = hiveTracker.selectedHive[0];
    myWidget = cloudinary.createUploadWidget({
    cloudName: 'digabwjfx',
    uploadPreset: hive._id
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
      }
    }
    );
  });

 
  

  async function widgetOpen(){
    console.log("trying to open widget")
      myWidget.open();
  };


  async function addHiveComment() {
    const success = await hiveTracker.addHiveComment(hive._id, comment);
    
    if (success) {
      hive = await hiveTracker.getHive(hive._id);
    } else {
      errorMessage = "Donation not completed - some error occurred";
    }
  };

  async function deleteHiveComment(comment_id) {
    const _id = comment_id.target.value;
    const success = await hiveTracker.deleteHiveComment(hive._id, _id);
    if (success) {
      hive = await hiveTracker.getHive(hive._id);
    } else {
      errorMessage = "Donation not completed - some error occurred";
    }
  };

  async function deleteOneHive() {

    console.log("testing delete hive " + hive._id);
    const success = await hiveTracker.deleteOneHive(hive._id);
    if (success) {
      push("/hives")
    } else {
      errorMessage = "Deletion not completed - some error occurred";
    }
  };

  function updateLocation(){
    push("/updateLocation");
  }

  function gallery(){
    push("/gallery");
  }
</script>

<div
  class="uk-margin uk-width-2xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large uk-card-hover"
>

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
          >Delete Hive
        </button>

      </div>
    <button
      on:click={widgetOpen}
      class="submit uk-button uk-button-primary uk-button-small uk-width-1-1"
      >Upload image</button
    >



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
                on:click={deleteHiveComment} value={detail._id}
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
