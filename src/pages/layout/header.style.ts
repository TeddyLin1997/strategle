import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'

export const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  padding: 10px 24px;
  user-select: none;
  z-index: 100;
  border-bottom: 2px solid #4c4c4c;
  background-color: #1d1e25;
`

export const HeaderContainer = styled.div`
  width: 100%;
  margin: auto;
  max-width: 1440px;
  display: flex;
  align-items: center;
`

export const LogoWrapper = styled(NavLink)`
  margin-right: 16px;
  height: 100%;
  display: flex;
  align-items: center;

  & > .logo-img {
    margin-right: 6px;
    width: 36px;
    height: auto;
  }

  & .logo-title {
    font-size: 16px;
    letter-spacing: .4px;
    line-height: 1;
    font-weight: 800;
    color: #FFC408;
    text-shadow: #b28905 .2px .2px 0px;
  }

  & .logo-sub-title {
    margin-top: 2px;
    margin-left: 2px;
    font-size: 12px;
    line-height: 1;
    font-weight: 800;
    color: #b28905;
  }
`

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
`

export const NavItem = styled(NavLink)`
  padding: 0 12px;
  font-size: 14px;
  font-weight: 700;
  color: #FFF;
  transition: all .2s;

  &.active {
    color: #FFC408 !important;
  }

  &:hover {
    color: #b28905;
  }
`

export const ConnectWallet = styled(Button)`
  margin-left: auto !important;
`

export const WalletContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export const WalletItem = styled.div`
  padding: 6px 12px;
  border-radius: 6px;
  width: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #FFC408;
  cursor: pointer;
  transition: all .1s;
  position: relative;

  & > .MuiChip-root {
    position: absolute;
    top: 4px;
    right: 2px;
  }

  &:hover {
    background-color: #ffc4088a;
  }

  & > .wallet-icon {
    width: 56px;
    height: auto;
  }

  & > .wallet-name {
    font-size: 12px;
    font-weight: bold;
  }
`

export const Title = styled.div`
  font-size: 14px;
`

export const AccountContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  & .current-chain-icon {
    margin-right: 6px;
    width: 20px;
    height: auto;
    border-radius: 50%;
  }
`

export const ChainItem = styled.div`
  padding-left: 12px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;

  &.active {
    background-color: #22272e !important;
  }
  &.active > .chain-icon {
    border-color: #FFC408;
  }
  &.active > .chain-text {
    color: #FFC408;
  }

  &:hover {
    background-color: #FFC4088a;
  }

  & > .chain-icon {
    width: 24px;
    height: auto;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
`
