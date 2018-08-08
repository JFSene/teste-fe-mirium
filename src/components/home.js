import _ from "lodash";
import React, { Component } from "react";
import { Media } from "react-bootstrap";
import { connect } from "react-redux";
import { Link,
         withRouter } from "react-router-dom";
import { fetchUser } from "../actions";

const btnStyle = {
  margin: "10px",
  widht: "30px"
};

const editarPerfil = "Editar Perfil";
const editar = "Editar Foto";
class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: "",
      imagePreviewUrl: "",
      show: true
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUser();
  }

  //Code taken from https://gist.github.com/hartzis/0b77920380736f98e4f9
  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }
  handleBack = () => {
    this.props.history.goBack()
  }

  renderUsers() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

   const user = _.map(this.props.users);

      return (
        <Media>
            <Media.Left align="top">
              {this.state.file ? (
                $imagePreview
              ) : (
                <img src={"../identicon.png"} alt="thumbnail" width={64} height={64} />
              )}
              <div className="buttons-div">
                  <div>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={this._handleImageChange}
                      ref={fileInput => (this.fileInput = fileInput)}
                    />
                    <button
                      type="submit"
                      onClick={() => this.fileInput.click()}
                      className="btn btn-secondary"
                      style={btnStyle}
                    >
                      {editar}
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={this.handleBack}
                      className="btn btn-secondary"
                      style={btnStyle}
                    >
                      {editarPerfil}
                    </button>
                  </div>
                </div>
            </Media.Left>
            <Media.Body>
              <Media.Heading>Perfil</Media.Heading>
              <p>
              Eu sou o {user.firstName} e tenho entre {user.age} anos e você pode
                  enviar emails para {user.email}. Eu moro no estado do {user.state}. <br />
                  Eu gosto de {user.interests ? user.interests[0] : 'jogos, futebol, musica'}. 
                  Você pode me contatar pelo numero {user.phone} ou no email {user.email}.

              </p>

            </Media.Body>
          </Media>
      ); 
  }

  render() {
    console.log(this.props.users);

    return (
      <div>
        <h3>Users</h3>
        <ul className="list-group">{this.renderUsers()}</ul>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/">
            Confirmar
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

UserShow = withRouter(UserShow);

UserShow = connect(
  mapStateToProps,
  { fetchUser }
)(UserShow);

export default UserShow;
