import React from 'react';
import Dropzone from 'react-dropzone';

class Photo extends React.Component {
  constructor () {
    super();
    this.state = { files: [] };
  }

  onDrop (files) {
    this.setState({
      files
    });
  }

  render () {
    return (
      <section>
        <div className="dropzone" >
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            accept="image/jpeg, image/png"
            maxSize={5242880}>
            <p>
            Click to add up to 5 images
            </p>
          </Dropzone>
        </div>
        <aside>
          <h2>
          Dropped files
          </h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

window.Photo = Photo;
