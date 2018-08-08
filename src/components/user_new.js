import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Image, Media } from "react-bootstrap";
import { connect } from "react-redux";
import { createUser } from "../actions/index";
import SelectList from "react-widgets/lib/SelectList";

const renderSelectList = ({ input, data }) => (
  <SelectList {...input} onBlur={() => {}} data={data} />
);

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "5px",
    borderRadius: "5px"
  },

  items: {
    display: "inline-block",
    padding: "2px",
    border: "1px solid blue",
    fontFamily: "Helvetica, sans-serif",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer"
  },

  input: {
    outline: "none",
    border: "none",
    fontSize: "14px",
    fontFamily: "Helvetica, sans-serif"
  }
};

const renderMaskedInput = ({ input }) => (
  <MaskedInput
    className="form-control"
    mask={[
      "(",
      /[1-9]/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ]}
    placeholder="(12) 34566-3452"
    guide={false}
    id="my-input-id"
    onBlur={() => {}}
    onChange={() => {}}
    {...input}
  />
);

const btnStyle = {
  margin: "10px",
  widht: "30px"
};

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      items: [],
      input: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    //tags binding
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  //Image Handlers
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

  renderImage() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }
  }

  //Tags Handlers
  // Code taken from the example https://stackblitz.com/edit/react-tag-input-1nelrc?file=index.js
  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if ( evt.keyCode === 188 ) {
      const {value} = evt.target;
      
      this.setState(state => ({
        items: [...state.items, value],
        input: ''
      }));
    }

    if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    }
  }


  //Renders Input Field
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>

        <input
          className="form-control"
          placeholder={field.placeholder}
          type="text"
          {...field.input} //objeto que contem eventHandlers e props assim como o valor do input
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  //Renders Checkbox
  renderCheckBox(field) {
    
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>

        <input
          className="form-control"
          placeholder={field.placeholder}
          type="checkbox"
          {...field.input} //objeto que contem eventHandlers e props assim como o valor do input
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);

    this.props.createUser(values, () => {
      this.props.history.push("/user-profile");
    });
  }

  render(field) {
    const { handleSubmit, hasEmailValue } = this.props;
    const {
      meta: { touched, error }
    } = field;
    return (
      <div>
        <Media>
          <Media.Left align="top">
            {this.state.file ? (
              $imagePreview
            ) : (
              <Image src=" " rounded widht={64} height={64} />
            )}
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
                Escolher Foto
              </button>
            </div>
          </Media.Left>
        </Media>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Nome"
            placeholder="John"
            name="firstName"
            component={this.renderField}
          />
          <Field
            label="Sobrenome"
            placeholder="Doe"
            name="lastName"
            component={this.renderField}
          />
          <div>
            <label>Idade</label>
            <Field
              name="age"
              component={renderSelectList}
              data={["13 - 19", "20 - 29", "30 - 45", "45 e acima"]}
            />
          </div>
          <Field
            label="Email"
            placeholder="name@email.com"
            name="email"
            component={this.renderField}
          />
          <label>Telefone</label>
          <Field name="phone" component={renderMaskedInput} />

          <Field
            label="Estado"
            placeholder="Paraná"
            name="state"
            component={this.renderField}
          />
          <Field
            label="País"
            placeholder="Brasil"
            name="country"
            component={this.renderField}
          />
          <div>
            <label>Tipo de endreço</label>
            <Field
              name="addressType"
              component={renderSelectList}
              data={["Residêncial", "Comercial"]}
            />
          </div>
          {hasEmailValue && (
            <Field
              label="Endereço"
              name="street"
              placeholder="Rua Nome da Rua, 1234"
              component={this.renderField}
            />
          )}
          <div className="form-group">
              <label>
                Interesses
                </label>
                <ul style={styles.container}>
                  {this.state.items.map((item, i) => (
                    <li
                      key={i}
                      style={styles.items}
                      onClick={this.handleRemoveItem(i)}
                    >
                      {item}
                      <span>(X)</span>
                    </li>
                  ))}
                  <input
                    style={styles.input}
                    value={this.state.input}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    {...fiels.input}
                    
                  />
                </ul>
            </div>
          
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  //Validar os inputs do usuario
  if (!values.firstName) {
    errors.firstName = "Digite seu nome";
  } else if (values.firstName.length > 20) {
    errors.firstName = "Deve conter 20 caracteres ou menos";
  }
  if (!values.lastName) {
    errors.lastName = "Digite seu sobrenome";
  }
  if (!values.email) {
    errors.email = "Digite seu email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }
  if (!values.state) {
    errors.state = "Digite o Estado";
  }
  if (!values.country) {
    errors.country = "Digite o País";
  }

  return errors;
}

// Decorate with redux-form
NewUser = reduxForm({
  form: "selectingFormValues" // a unique identifier for this form
})(NewUser);

// Decorate with connect to read form values
const selector = formValueSelector("selectingFormValues"); // <-- same as form name
NewUser = connect(
  state => {
    // can select values individually
    const hasEmailValue = selector(state, "addressType");
    return {
      hasEmailValue
    };
  },
  { createUser }
)(NewUser);

export default NewUser;
