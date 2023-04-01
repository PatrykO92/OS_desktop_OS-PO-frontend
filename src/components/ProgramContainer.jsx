import "../assets/styles/programContainer.css";

import { windowMinimizeIcon, xmarkIcon } from "../assets/icons";

const ProgramContainer = ({
  lang,
  programName,
  programIcon,
  programHidden,
  handleProgramState,
}) => {
  return (
    <div
      className={
        programHidden
          ? "program-container program-container_hidden"
          : "program-container"
      }
    >
      <div className="program-container_title-bar">
        <div className="program-container_title-bar_program-name">
          <img src={programIcon} alt="placeholder to remove" />
          <p>{programName}</p>
        </div>
        <div className="program-container_title-bar_buttons">
          <button
            onClick={() => {
              handleProgramState("hidden", true);
            }}
          >
            <img src={windowMinimizeIcon} alt={lang.minimize} />
          </button>
          <button
            onClick={() => {
              handleProgramState("hidden", true);
              setTimeout(() => {
                handleProgramState("programOn", false);
              }, 350);
            }}
          >
            <img src={xmarkIcon} alt={lang.closeProgram} />
          </button>
        </div>
      </div>
      <div className="program-container_main-window"></div>
    </div>
  );
};

export default ProgramContainer;