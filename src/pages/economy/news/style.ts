import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 12px 2rem;
  width: 100%;
  display: flex;

  image {
    object-fit: cover;
  }
`

export const Title = styled.div`
  margin-top: 1.8rem;
  padding: 0 12px;
  font-size: 24px;
  font-weight: 700;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-wrap:  wrap;
  }
`

export const Monetary = styled.div`
  padding-left: 1.2rem;
  width: 43%;
  display: flex;
  flex-direction: column;
  gap: .4rem;

  @media screen and (max-width: 768px) {
    padding-left: 0;
    width: 100%;
  }

  .monetary-article {
    padding: .75rem;
    display: flex;
    height: 96px;
    transition: all .2s;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #fafafa;
      .monetary-title {
        text-decoration: underline;
      }
    }
  }

  .monetary-image-container {
    margin-right: 1rem;
    display: flex;
    flex: 1;
    height: auto;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);
  }

  .monetary-image {
    margin: auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .monetary-content {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .monetary-title {
    width: calc(100% - .4rem);
    color: #121214 !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .monetary-tip {
    display: flex;
    justify-content: space-between;
    font-size: .8rem;
    color: #737373;
  }
`


export const MainNew = styled.div`
  padding-top: .75rem;
  display: flex;
  flex-direction: column;
  width: 57%;
  height: 604px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .main-image-container {
    display: block;
    width: 100%;
    height: 60%;
    position: relative;
    cursor: pointer;
    box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);

    .image {
      object-position: top left;
      filter: brightness(70%);
      border-radius: 6px;
      transition: all .2s;
    }

    &:hover {
      .image {
        filter: brightness(60%);
      }
    }

    .main-new-title {
      padding: 12px;
      position: absolute;
      bottom: 0;
      font-size: 1.8rem;
      text-shadow: 1px 1px 2px #121212;
      color: #fff;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .image {
    width:100%;
    height: 100%;
    object-fit: cover;
    transition: all .2s;
  }

  .main-sub-container {
    padding-top: 1.2rem;
    display: flex;
    gap: 1.2rem;
  }

  .main-sub-article {
    width: 25%;
    cursor: pointer;

    &:hover {
      .image {
        filter: brightness(60%);
      }

      .main-sub-title {
        text-decoration: underline;
      }
    }
  }

  .main-sub-image {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);
  }

  .main-sub-title {
    margin-top: .6rem;
    width: calc(100% - .4rem);
    color: #121214 !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
