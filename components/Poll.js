import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import AppContext from "./AppContext";
import Input from "./Input";
import Button from "./Button";
import PollBody from "./PollBody";
import EditButton from "./EditButton";

export const Poll = () => {
	const { userRole } = useContext(AppContext);
	const [edit, toggleEdit] = useState(false);
	const [answers, changeAnswersLength] = useState(["Subs", "Pizza", "Sushi"]);
	const [showResults, toggleResults] = useState(false);
	const [selectedAnswer, selectAnswer] = useState(null);

	let question = "What should we order for dinner?";

	return (
		<div>
			<form
				className="poll"
				onSubmit={(e) => {
					e.preventDefault();
					console.log("submit poll");
				}}
			>
				<EditButton
					edit={edit}
					onClick={(e) => {
						e.preventDefault();
						toggleEdit((prevEdit) => !prevEdit);
					}}
				/>
				<div className="poll__question">
					<Input readonly={!edit} value={question} />
				</div>
				<div className="poll__wrapper">
					<PollBody
						showResults={showResults}
						selectedAnswer={selectedAnswer}
						answers={answers}
						edit={edit}
						selectAnswer={selectAnswer}
					/>
				</div>
				<div className={`poll__controls ${!edit ? "hidden" : ""}`}>
					<button
						className="poll__controls--minus"
						onClick={(e) => {
							e.preventDefault();
							changeAnswersLength((prevAnswers) => prevAnswers.slice(0, -1));
						}}
					>
						<FontAwesomeIcon className="icon" icon={faMinusSquare} />
					</button>
					<button
						className="poll__controls--add"
						onClick={(e) => {
							e.preventDefault();
							changeAnswersLength((prevAnswers) => [...prevAnswers, ""]);
						}}
					>
						<FontAwesomeIcon className="icon" icon={faPlusSquare} />
					</button>
				</div>

				{userRole === "professor" && (
					<Button
						className={`${showResults && "left"}`}
						onClick={(e) => {
							e.preventDefault();
							toggleResults(!showResults);
						}}
					>
						Show{showResults ? " Choices" : " Results"}
					</Button>
				)}
				{userRole === "professor" && showResults === true ? (
					<Button
						className="gold"
						onClick={(e) => {
							e.preventDefault();
							toggleResults((prevShowResults) => !prevShowResults);
						}}
					>
						Clear Results
					</Button>
				) : null}
				{selectedAnswer !== null && !showResults && userRole === "student" ? (
					<Button
						className="gold"
						onClick={(e) => {
							e.preventDefault();
							toggleResults((prevShowResults) => !prevShowResults);
						}}
					>
						SUBMIT
					</Button>
				) : null}
			</form>
		</div>
	);
};
