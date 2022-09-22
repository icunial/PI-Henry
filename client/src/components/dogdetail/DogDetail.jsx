import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./DogDetail.module.css";

import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";

import { createComment } from "../../store/actions/actions";
import { deleteDog } from "../../store/actions/dogsActions";

const validate = (input) => {
  let errors = {};

  if (input.name.length > 25 || input.name.length < 0) {
    errors.name = "Name length must be between 0 and 25";
  }

  if (input.message.length <= 0) {
    errors.message = "You must write a message";
  } else if (input.message.length > 100) {
    errors.message = "Your message must be 100 characters at most!";
  }

  return errors;
};

function DogDetail() {
  const dog = useSelector((state) => state.dog);
  const loading = useSelector((state) => state.loading);
  const comments = useSelector((state) => state.comments);

  const [input, setInput] = useState({
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState({ message: "You must write a message" });

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

  const dispatch = useDispatch();
  const history = useHistory();

  const divImage = {
    backgroundImage: "url(" + `${dog.image}` + ")",
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.globalContainer}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.dogContainer}>
          <div
            className={styles.imageContainer}
            style={dog.image && divImage}
          ></div>
          <div className={styles.contentContainer}>
            <div>
              <div className={styles.dogName}>{dog.name}</div>
              <div className={styles.physicalContent}>
                <div className={styles.physicalItem}>
                  <p className={styles.physicalTitle}>Weight</p>
                  <p className={styles.physicalData}>{dog.weight}</p>
                </div>
                <div className={styles.physicalItem}>
                  <p className={styles.physicalTitle}>Height</p>
                  <p className={styles.physicalData}>{dog.height}</p>
                </div>
                <div className={styles.physicalItem}>
                  <p className={styles.physicalTitle}>Life Span</p>
                  <p className={styles.physicalData}>{dog.life_span}</p>
                </div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Temperaments</div>
                <div className={styles.temperamentContent}>
                  {dog.temperament.map((t) => {
                    return <span key={t}>{t}</span>;
                  })}
                </div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Origin</div>
                <div className={styles.dataContent}>NOT SPECIFIED</div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Bred For</div>
                <div className={styles.dataContent}>NOT SPECIFIED</div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Breed Group</div>
                <div className={styles.dataContent}>NOT SPECIFIED</div>
              </div>
            </div>
            {dog.id.toString().includes("-") ? (
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  dispatch(deleteDog(dog.id));
                  history.goBack();
                }}
              >
                Delete Dog
              </button>
            ) : null}
          </div>
        </div>
        {dog.id.toString().includes("-") ? (
          <div className={styles.commentsContainer}>
            <div className={styles.commentsSection}>
              {comments.map((comment) => (
                <div className={styles.comment} key={comment.id}>
                  <span>{comment.name}</span>
                  <p>{comment.message}</p>
                </div>
              ))}
            </div>
            <div className={styles.formComment}>
              <input
                className={styles.formField}
                type="text"
                placeholder="Name... (Optional)"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
              <input
                className={styles.formField}
                type="text"
                placeholder="Write your message..."
                name="message"
                value={input.message}
                onChange={handleInputChange}
              />
              <button
                className={
                  Object.keys(errors).length ? styles.disabledBtn : styles.btn
                }
                disabled={Object.keys(errors).length}
                onClick={() => {
                  dispatch(
                    createComment({
                      name: input.name ? input.name : "Anonymous",
                      message: input.message,
                      dogId: dog.id,
                    })
                  );
                  setInput({
                    name: "",
                    message: "",
                  });
                }}
              >
                Send
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DogDetail;
