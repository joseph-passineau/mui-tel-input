import React from 'react'
import Menu, { MenuProps } from '@mui/material/Menu'
import FlagMenuItem from '@components/FlagMenuItem/FlagMenuItem'
import { COUNTRIES, Country } from '@shared/constants/countries'
import { Iso3166Alpha2Code } from '@shared/constants/iso'
import { DEFAULT_LANG } from '@shared/constants/lang'
import { filterCountries } from '@shared/helpers/country'
import { getDisplayNames } from '@shared/helpers/intl'

export type FlagsMenuProps = Pick<MenuProps, 'anchorEl' | 'onClose'> & {
  selectedCountry: Country
  onlyCountries?: Iso3166Alpha2Code[]
  excludeCountries?: Iso3166Alpha2Code[]
  langOfCountryName?: Iso3166Alpha2Code
  onSelectCountry: (country: Country) => void
}

const FlagsMenu = (props: FlagsMenuProps) => {
  const {
    anchorEl,
    selectedCountry,
    onSelectCountry,
    excludeCountries,
    onlyCountries,
    langOfCountryName,
    ...rest
  } = props

  const countriesFiltered = React.useMemo<readonly Country[]>(() => {
    return filterCountries(COUNTRIES, {
      onlyCountries,
      excludeCountries
    })
  }, [excludeCountries, onlyCountries])

  const displayNames = getDisplayNames(langOfCountryName)

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      id="select-country"
      MenuListProps={{
        role: 'listbox',
        'aria-activedescendant': `country-${selectedCountry.isoCode}`,
        'aria-labelledby': 'select-country'
      }}
      {...rest}
    >
      {countriesFiltered.map((country) => {
        return (
          <FlagMenuItem
            onSelectCountry={onSelectCountry}
            key={country.isoCode}
            country={country}
            displayNames={displayNames}
            selected={country.isoCode === selectedCountry.isoCode}
            id={`country-${country.isoCode}`}
          />
        )
      })}
    </Menu>
  )
}

FlagsMenu.defaultProps = {
  onlyCountries: [],
  excludeCountries: [],
  langOfCountryName: DEFAULT_LANG
}

export default FlagsMenu
