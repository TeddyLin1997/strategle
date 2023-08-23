import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  padding: 14px 24px;
  width: 100%;
  height: 56px;
  box-shadow: 0 2px 8px #f2f3f5;
  background-color: #1d2129;

  display: flex;
  align-items: center;
`

export const LogoWrapper = styled.div`
  margin-right: 16px;
  height: 100%;
  display: flex;
  align-items: center;

  & > .logo-img {
    margin-right: 6px;
    width: auto;
    height: 100%;
  }

  & .logo-title {
    font-size: 16px;
    letter-spacing: .4px;
    line-height: 1;
    font-weight: 900;
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

export const Navigation = styled.div`
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
  color: #121214 !important;
`

export const WalletContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export const WalletItem = styled.div`
  padding: 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #FFC408;
  cursor: pointer;
  transition: all .1s;

  &:hover {
    background-color: #ffc4088a;
  }

  & > .wallet-icon {
    width: 42px;
    height: auto;
  }

  & > .wallet-name {
    margin-top: 4px;
    font-weight: bold;
  }
`

export const Title = styled.div`
  font-size: 14px;
`
