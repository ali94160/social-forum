import { BaseSyntheticEvent } from "react";
import { Autocomplete, Chip, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface Props {
  options: string[];
  label?: string;
  isRerender: boolean;
  selected: string[];
  setSelected: Function;
  limitTags?: number;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectCheckbox = ({
  label,
  options,
  isRerender,
  setSelected,
  limitTags,
  selected
}: Props) => {
  const handleChange = (event: BaseSyntheticEvent, value: string[]) => {
    setSelected(value);
  };

  return (
    <Autocomplete
      multiple
      key={`search-category-${isRerender}`}
      limitTags={limitTags}
      options={options}
      onChange={(event, value) => handleChange(event, value)}
      disableCloseOnSelect
      value={selected || " "}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} label={option} />
        ));
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            key={`filter-category-checkbox-${option}`}
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default SelectCheckbox;
