import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog } from "../../store/actions";
import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";

import styles from "./Form.module.css";

export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "you must enter a name";
  } else if (input.name.trim().length < 4) {
    errors.name = "the name must contain at least 4 characters";
  } else if (/\d/.test(input.name)) {
    errors.name = "the name can not contain numbers";
  } else if (!/^[a-zA-Z ]+$/.test(input.name)) {
    errors.name = "the name must contain only characters";
  } else if (input.name.length > 15) {
    errors.name = "the name length must be 15 character max";
  }

  if (!input.min_weight || !input.max_weight) {
    errors.weight = "you must enter the weight of your dog";
  } else if (
    !/^[0-9]+$/.test(input.min_weight) ||
    !/^[0-9]+$/.test(input.max_weight)
  ) {
    errors.weight = "weight fields must contain numbers";
  } else if (Number(input.min_weight) >= Number(input.max_weight)) {
    errors.weight = "min weight must be lower than max weight";
  } else if (Number(input.min_weight) > 150 || Number(input.max_weight) > 150) {
    errors.weight = "your dog can not weight more than 100";
  }

  if (!input.min_height || !input.max_height) {
    errors.height = "you must enter the height of your dog";
  } else if (
    !/^[0-9]+$/.test(input.min_height) ||
    !/^[0-9]+$/.test(input.max_height)
  ) {
    errors.height = "height fields must contain numbers";
  } else if (Number(input.min_height) >= Number(input.max_height)) {
    errors.height = "min height must be lower than max height";
  } else if (Number(input.min_height) > 120 || Number(input.max_height) > 120) {
    errors.height = "your dog can not measure more than 120";
  }

  if (!input.min_life_span || !input.max_life_span) {
    errors.life_span = "you must enter the life span of your dog";
  } else if (
    !/^[0-9]+$/.test(input.min_life_span) ||
    !/^[0-9]+$/.test(input.max_life_span)
  ) {
    errors.life_span = "life span fields must contain numbers";
  } else if (Number(input.min_life_span) >= Number(input.max_life_span)) {
    errors.life_span = "min life span must be lower than max life span";
  } else if (
    Number(input.min_life_span) > 25 ||
    Number(input.max_life_span) > 25
  ) {
    errors.life_span = "life span can not be more than 25";
  }

  if (input.temperament.length === 0) {
    errors.temperament = "you must select one temperament";
  }

  return errors;
}

const Modal = (props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <p>Dog Created Successfully!</p>
        <button onClick={props.onClose}>Accept</button>
      </div>
    </div>
  );
};

const DropDown = (props) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownBtn} onClick={() => props.onClick()}>
        Select at least one temperament from the list...
      </div>
      {props.isOpen && (
        <div className={styles.dropdownContent}>
          {props.temperaments.map((t) => {
            return (
              <div
                className={styles.dropdownItem}
                key={t.name}
                onClick={(e) => {
                  if (!props.input.temperament.includes(t.name)) {
                    props.setInput((input) => {
                      const newInput = {
                        ...input,
                        temperament: [...input.temperament, t.name],
                      };
                      const errors = validate(newInput);
                      props.setErrors(errors);

                      return newInput;
                    });
                  }
                  props.onClick();
                }}
              >
                {t.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

function Form() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    min_life_span: "",
    max_life_span: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({ initialState: "" });
  const [modal, setModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  const handleInputChange = (e) => {
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };

      const errors = validate(newInput);
      setErrors(errors);

      return newInput;
    });
  };

  const clearInputs = () => {
    setInput({
      name: "",
      min_weight: "",
      max_weight: "",
      min_height: "",
      max_height: "",
      min_life_span: "",
      max_life_span: "",
      temperament: [],
      temperaments: [],
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.globalContainer}>
      <Navbar />
      {modal && <Modal onClose={closeModal} />}
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.headerContainer}>
            <h1>Create New Dog</h1>
          </div>
          <form>
            <div className={styles.itemsContainer}>
              <label className={styles.itemsTitle}>Name</label>
              <div className={styles.itemContent}>
                <input
                  name="name"
                  className={styles.item}
                  type="text"
                  placeholder="Write dog name..."
                  value={input.name}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className={styles.message}>
                <p className={errors.name ? styles.error : null}>
                  {errors.name ? errors.name : ""}
                </p>
              </div>
            </div>
            <div className={styles.itemsContainer}>
              <label className={styles.itemsTitle}>Weight</label>
              <div className={styles.itemContent}>
                <span>Min:</span>
                <input
                  name="min_weight"
                  className={styles.item}
                  type="text"
                  placeholder="Min weight..."
                  value={input.min_weight}
                  onChange={handleInputChange}
                ></input>
                <span>Max:</span>
                <input
                  className={styles.item}
                  type="text"
                  placeholder="Max weight..."
                  name="max_weight"
                  value={input.max_weight}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className={styles.message}>
                <p className={errors.weight ? styles.error : null}>
                  {errors.weight ? errors.weight : null}
                </p>
              </div>
            </div>
            <div className={styles.itemsContainer}>
              <label className={styles.itemsTitle}>Height</label>
              <div className={styles.itemContent}>
                <span>Min:</span>
                <input
                  className={styles.item}
                  type="text"
                  placeholder="Min height..."
                  name="min_height"
                  value={input.min_height}
                  onChange={handleInputChange}
                ></input>
                <span>Max:</span>
                <input
                  className={styles.item}
                  type="text"
                  placeholder="Max height..."
                  name="max_height"
                  value={input.max_height}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className={styles.message}>
                <p className={errors.height ? styles.error : null}>
                  {errors.height ? errors.height : null}
                </p>
              </div>
            </div>
            <div className={styles.itemsContainer}>
              <label className={styles.itemsTitle}>Life Span</label>
              <div>
                <div className={styles.itemContent}>
                  <span>Min:</span>
                  <input
                    className={styles.item}
                    type="text"
                    placeholder="Min life span..."
                    name="min_life_span"
                    value={input.min_life_span}
                    onChange={handleInputChange}
                  ></input>
                  <span>Max:</span>
                  <input
                    className={styles.item}
                    type="text"
                    placeholder="Max life span..."
                    name="max_life_span"
                    value={input.max_life_span}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className={styles.message}>
                <p className={errors.life_span ? styles.error : null}>
                  {errors.life_span ? errors.life_span : null}
                </p>
              </div>
            </div>
            <div className={styles.itemsContainer}>
              <label className={styles.itemsTitle}>Temperament</label>
              <div>
                <div className={styles.itemContent}>
                  {
                    <DropDown
                      temperaments={temperaments}
                      isOpen={isOpen}
                      onClick={openDropDown}
                      input={input}
                      setInput={setInput}
                      setErrors={setErrors}
                    />
                  }
                </div>
              </div>
              <div className={styles.temperaments}>
                {input.temperament.map((t) => {
                  return (
                    <div
                      key={t}
                      className={styles.temperamentItem}
                      onClick={(e) => {
                        setInput((input) => {
                          const newInput = {
                            ...input,
                            temperament: input.temperament.filter(
                              (i) => i !== t
                            ),
                          };
                          const errors = validate(newInput);
                          setErrors(errors);

                          return newInput;
                        });
                      }}
                    >
                      <p>{t}</p>
                      <span>x</span>
                    </div>
                  );
                })}
              </div>
              <div className={styles.message}>
                <p className={errors.temperament ? styles.error : null}>
                  {errors.temperament ? errors.temperament : null}
                </p>
              </div>
            </div>
            <div className={styles.itemsContainer}>
              <button
                className={
                  Object.keys(errors).length ? styles.btnDisabled : styles.btn
                }
                type="button"
                disabled={Object.keys(errors).length}
                onClick={(e) => {
                  e.preventDefault();

                  dispatch(
                    createDog({
                      name: input.name,
                      weight: input.min_weight + " - " + input.max_weight,
                      height: input.min_height + " - " + input.max_height,
                      life_span:
                        input.min_life_span + " - " + input.max_life_span,
                      temperaments: input.temperament,
                    })
                  );
                  showModal();
                  clearInputs();
                }}
              >
                Create new dog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
