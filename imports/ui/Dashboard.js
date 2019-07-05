import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css'

import PrivateHeader from './PrivateHeader';
import FileUploadComponent from "./FileUpload";
import Searchbox from './Searchbox';
import Card from './Card';
import IndividualFile from './FileIndividualFile.js';
import UserFiles from '../api/FilesCol.js'

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: [],
            progress: 0,
            inProgress: false,
            imgFileId: "",
            error: ''
        };

        // this.uploadIt = this.uploadIt.bind(this);
      }

    onSubmit(e) {
      e.preventDefault();
    //   let name  = this.refs.name.value.trim();
    //   let surname  = this.refs.surname.value.trim();
    // //   let Mnumber  = this.refs.mobile.value.trim();
    //   let adharcard  = this.refs.adharcard.value.trim();
    //   let addess  = this.refs.addess.value.trim();
    //   let Mnumber  = this.refs.mob.value.trim();
    //   let landsize  = this.refs.landsize.value.trim();
    //   let tags  = this.refs.tags.value.trim();
    //   let product  = this.refs.product.value.trim();
    // //   let Mnumber  = this.refs.mobile.value.trim();

    // if (name.length < 4) {
    //     return this.setState({error: 'Name must Be 3 char long'});
    //   }
    //   if (surname.length < 4) {
    //     return this.setState({error: 'Surname must Be 3 char long'});
    //   }
    //   if(adharcard.length !== 0) {
    //     if (adharcard.length == 12) {
    //             return this.setState({error: 'Adharcard must number Be 12 char long'});
    //         }
    //   }
      
    //   if(addess.length !== 0) {
    //     if (addess.length == 4) {
    //             return this.setState({error: 'Address must Be 3 char long'});
    //         }
    //   }
    //   if(Mnumber.length !== 0) {
    //     if (Mnumber.length == 10) {
    //             return this.setState({error: 'Mobile no must Be 3 char long'});
    //         }
    //         if(!Mnumber.match(/^-{0,1}\d+$/)){
    //             return this.setState({error: 'Invalid Mobile number'});
    //           }
    //   }
    // //   if(landsize.length !== 0) {
    // //     if (Mnumber.length == 10) {
    // //             return this.setState({error: 'Mobile no must Be 3 char long'});
    // //         }
    // //   }
    // if(tags.length !== 0) {
    //     if (tags.length > 3) {
    //             return this.setState({error: '#tags no must Be 3 char long'});
    //         }
    //   }
    //   if(product.length !== 0) {
    //     if (product.length > 3) {
    //             return this.setState({error: 'Product no must Be 3 char long'});
    //         }
    //   }
    
    //   if(!this.state.error) {
        let self = this;
        console.log("fileupload2",e.currentTarget.file);
        if (e.currentTarget.files && e.currentTarget.files[0]) {
          // We upload only one file, in case
          // there was multiple files selected
          var file = e.currentTarget.files[0];
            console.log("fileupload",file);
          if (file) {
              alert("sdds");
            let uploadInstance = UserFiles.insert({
              file: file,
              meta: {
                locator: self.props.fileLocator,
                userId: Meteor.userId() // Optional, used to check on server for file tampering
              },
              streams: 'dynamic',
              chunkSize: 'dynamic',
              allowWebWorkers: true // If you see issues with uploads, change this to false
            }, false)
    
            self.setState({
              uploading: uploadInstance, // Keep track of this instance to use below
              inProgress: true // Show the progress bar now
            });
    
            // These are the event functions, don't need most of them, it shows where we are in the process
            uploadInstance.on('start', function () {
              console.log('Starting');
            })
    
            uploadInstance.on('end', function (error, fileObj) {
              console.log('On end File Object: ', fileObj);
            })
    
            uploadInstance.on('uploaded', function (error, fileObj) {
              console.log('uploaded: ', fileObj);
    
              // Remove the filename from the upload box
              self.refs['fileinput'].value = '';
    
              // Reset our state for the next file
              self.setState({
                uploading: [],
                progress: 0,
                inProgress: false
              });
            })
    
            uploadInstance.on('error', function (error, fileObj) {
              console.log('Error during upload: ' + error)
            });
    
            uploadInstance.on('progress', function (progress, fileObj) {
              console.log('Upload Percentage: ' + progress)
              // Update our progress bar
              self.setState({
                progress: progress
              });
            });
    
            uploadInstance.start(); // Must manually start the upload
          }
        }
    //   }

    //   Meteor.call('Add Kiasn data', name,surname,
    //   adharcard,addess,Mnumber,landsize,tags,product,
    //   (error, result) => {
    //       if(error){
    //           console.log("Add Kiasn data error ", error);
    //       } else {
    //         console.log("Add Kiasn data res ", result);
    //       }
    //   })
      
    }
    render() {
        // debug("Rendering FileUpload",this.props.docsReadyYet);
    if (this.props.files && this.props.docsReadyYet) {

        let fileCursors = this.props.files;
  
        // Run through each file that the user has stored
        // (make sure the subscription only sends files owned by this user)
        let display = fileCursors.map((aFile, key) => {
          //console.log('A file: ', aFile.link(), aFile.get('name'))
          let link = UserFiles.findOne({_id: aFile._id}).link();  //The "view/download" link
          // console.log('get link',link);
          // this.setState({imgFileId: aFile._id});
          // Send out components that show details of each file
          return <div key={'file' + key}>
            <IndividualFile
              fileName={aFile.name}
              fileUrl={link}
              fileId={aFile._id}
              fileSize={aFile.size}
            />
          </div>
        })
     return (
        <div>
            <PrivateHeader title= 'Dashboard'/>
            <Searchbox/>
            <Card/>
            
            <div className="page-content">
                {/* <NoteList/> */}
            </div>
            <div className="columns">
            <div className="column is-one-third">


    <div>
        

        <div className="">
          <div className="">

            {/* {this.showUploads()} */}

          </div>
          <div className="">
          </div>
        </div>
        <div className="">
          {display}
        </div>
      </div>


            {/* <FileUploadComponent/> */}
            </div>
            <div className="column">
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">

            <div>
             {this.state.imgFileId}
              <div className="file">
                <label className="file-label">
                <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
            </div>


                {/* <div className="field">
                <label className="label">Name</label>
                    <div className="control">
                        <input className="input" ref="name" name="name" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Surname</label>
                    <div className="control">
                        <input className="input" ref="surname" name="surname" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Adharcard Number</label>
                    <div className="control">
                        <input className="input" ref="adharcard" name="adharcard" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Address</label>
                    <div className="control">
                        <input className="input" ref="addess" name="addess" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Mobile Number</label>
                    <div className="control">
                        <input className="input" ref="mob" name="mob" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Land Size</label>
                    <div className="control">
                        <input className="input" ref="landsize" name="landsize" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Tags</label>
                    <div className="control">
                        <input className="input" ref="tags" name="tags" type="text" placeholder="Medium input"/>
                    </div>
                </div>

                <div className="field">
                <label className="label">Product</label>
                    <div className="control">
                        <input className="input" ref="product" name="product" type="text" placeholder="Medium input"/>
                    </div>
                </div> */}


            
            <button className="button">Confirm</button>
            <div>{this.state.error ? <p>{this.state.error}</p> : undefined}</div>
            </form>
            </div>
            {/* <div className="column">
                Fourth column
            </div> */}
            </div>
        </div>
    );
    }
    else return <div>Loading file list</div>;
 }
};

export default withTracker( ( props ) => {
    const filesHandle = Meteor.subscribe('files.all');
    const docsReadyYet = filesHandle.ready();
    const files = UserFiles.find({}, {sort: {name: 1}}).fetch();
  
    return {
      docsReadyYet,
      files,
    };
  })(Dashboard);