import mglass from "../../images/Magnifying_glass_icon2.png";
import { api } from "../../api/api";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

export function SearchBar() {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();

  function handleSelect(e) {
    navigate(`/${e.value}`);
  }

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/game/games`);
        setGameList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGame();
  }, []);

  const colourStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isDisabled
          ? "#F00707"
          : isSelected
          ? "#F0A207"
          : isFocused
          ? "#D6D6D6"
          : undefined,
        color: "#353535",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : "07DF2B"
            : undefined,
        },
      };
    },
  };

  const options = gameList.map((current) => {
    return {
      value: `${current._id}`,
      label: `${current.title}`,
    };
  });

  return (
    <div className={style.searchBar}>
      <Select
        className={style.select}
        options={options}
        onChange={handleSelect}
        styles={colourStyles}
        placeholder={<img src={mglass} alt="magnyfing glass icon" />}
        label="Single select"
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
}
