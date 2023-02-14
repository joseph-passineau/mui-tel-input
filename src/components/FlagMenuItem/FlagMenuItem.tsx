import React from 'react'
import Flag from '@components/Flag/Flag'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { COUNTRIES, MuiTelInputCountry } from '@shared/constants/countries'
import { FlagSize } from '../../index.types'
import { Styled } from './FlagsMenuItem.styled'

export type FlagMenuItemProps = MenuItemProps & {
  isoCode: MuiTelInputCountry
  onSelectCountry: (isoCode: MuiTelInputCountry) => void
  countryName: string | undefined
  flagSize?: FlagSize
}

const FlagMenuItem = (props: FlagMenuItemProps) => {
  const { isoCode, onSelectCountry, countryName, flagSize, ...menuItemProps } =
    props

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault()
    onSelectCountry(isoCode)
  }

  return (
    <MenuItem
      {...menuItemProps}
      onClick={handleClick}
      role="option"
      data-testid={`option-${isoCode}`}
      className="MuiTelInput-MenuItem"
    >
      <Styled.ListItemIcon className="MuiTelInput-ListItemIcon-flag">
        <Flag size={flagSize} isoCode={isoCode} countryName={countryName} />
      </Styled.ListItemIcon>
      <Styled.ListItemText className="MuiTelInput-ListItemText-country">
        {countryName}
      </Styled.ListItemText>
      <Typography
        variant="body2"
        color="text.secondary"
        className="MuiTelInput-Typography-calling-code"
      >
        +{COUNTRIES[isoCode]?.[0]}
      </Typography>
    </MenuItem>
  )
}

FlagMenuItem.defaultProps = {
  flagSize: 'small' as FlagSize
}

export default React.memo(FlagMenuItem)
