import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getAllSkills } from "../../Redux/actions";
import AutoCompleteAsync from "../Form/AutoCompleteAsync";
import { SkillObjectModel } from "../Users/models";

interface SkillSelectProps {
  name: string;
  errors?: string | undefined;
  className?: string;
  searchAll?: boolean;
  multiple?: boolean;
  showAll?: boolean;
  showNOptions?: number;
  disabled?: boolean;
  selected: SkillObjectModel | SkillObjectModel[] | null;
  setSelected: (selected: SkillObjectModel) => void;
}

export const SkillSelect = (props: SkillSelectProps) => {
  const {
    name,
    multiple,
    selected,
    setSelected,
    searchAll,
    showAll = true,
    showNOptions = 10,
    disabled = false,
    className = "",
    errors = "",
  } = props;

  const dispatchAction: any = useDispatch();

  const skillSearch = useCallback(
    async (text: string) => {
      const params = {
        limit: 50,
        offset: 0,
        search_text: text,
        all: searchAll,
      };

      const res = await dispatchAction(getAllSkills(params));

      return res?.data?.results;
    },
    [dispatchAction, searchAll, showAll]
  );

  return (
    <AutoCompleteAsync
      name={name}
      multiple={multiple}
      selected={selected}
      onChange={setSelected}
      disabled={disabled}
      fetchData={skillSearch}
      showNOptions={showNOptions}
      optionLabel={(option: any) =>
        option.name +
        (option.district_object ? `, ${option.district_object.name}` : "")
      }
      compareBy="id"
      className={className}
      error={errors}
    />
  );
};
