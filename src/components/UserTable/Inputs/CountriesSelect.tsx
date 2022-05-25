import React from 'react';
import { useSelector } from 'react-redux';
import Countries from 'components/CustomCountries';
export default React.memo(
  ({
    item,
    prop,
    handleChange,
    setSelectOpen: setSelectOpenMainFunc,
    targetSelectIsOpen: targetSelectIsOpenMainFunc,
    name: placeholder = 'NATION',
  }: any) => {
    // @ts-ignore
    const countries = useSelector(state => state.company.countries);
    const name = 'countries';
    const setSelectOpen = setSelectOpenMainFunc(name);
    const targetSelectIsOpen = targetSelectIsOpenMainFunc(name);

    return (
      <Countries
        selected={item[prop]}
        onChange={(e: any) => {
          handleChange(prop, e._id);
        }}
        list={countries}
        selectedCountryId={item[prop]}
        setSelectOpen={setSelectOpen}
        targetSelectIsOpen={targetSelectIsOpen}
        placeholder={placeholder}
      />
    );
  },
);
