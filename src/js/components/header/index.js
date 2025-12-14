import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, constants } from '../../toolbox';
import { popView } from '../../views/actions';

const { color, animation } = constants;
const { slideInFromRight, slideOutToRight } = animation;

const Container = styled.div`
   z-index: 2;
   position: fixed;
   display: flex;
   top: 0;
   left: 0;
   right: 0;
   max-width: 1200px;
   margin: 0 auto;
   height: ${props => (props.hideTitle ? '48px' : '90px')};
   padding-left: 48px;
   background: white;
   overflow: hidden;
   transition: all 0.3s ease-in-out;

   @media screen and (max-width: 768px) {
      padding-left: 0;
   }
`;

const ChevronButton = styled.button`
   cursor: pointer;
   width: 40px;
   margin-left: -6px;
   opacity: ${props => (props.isShown ? 1 : 0)};
   transform: ${props =>
      props.isShown ? 'scale(1) translateX(0)' : 'scale(0) translateX(20px)'};
   transition: all 0.3s;
   background: transparent;
   border: none;
   padding: 0;
   pointer-events: ${props => (props.isShown ? 'auto' : 'none')};

   &:active {
      svg {
         color: ${color.redAlpha[2]};
      }
   }

   &:focus {
      outline: none;
      svg {
         filter: drop-shadow(0 0 2px ${color.red[4]});
      }
   }
`;

const TitleContainer = styled.div`
   position: absolute;
   margin-top: ${props =>
      (props.isBackButton && !props.exiting) || props.isHidden
         ? '5px'
         : '48px'};
   margin-left: ${props =>
      props.isHidden && !props.exiting ? '-100%' : '24px'};
   margin-left: ${props => props.isTitle && props.exiting && '100vw'};
   animation: ${props => (props.isLeaving ? slideOutToRight : slideInFromRight)}
      0.3s ease-in-out;
   transition: all 0.3s ease-in-out;

   h1 {
      color: ${props =>
         (props.isBackButton && !props.exiting) || props.isHidden
            ? color.red[4]
            : color.black};
      color: ${props => props.isTitle && props.exiting && 'white'};
      font-weight: ${props =>
         (props.isBackButton && !props.exiting) || props.isHidden
            ? 'normal'
            : 'bold'};
      font-size: ${props =>
         (props.isBackButton && !props.exiting) || props.isHidden
            ? '20px'
            : null};
      opacity: ${props => (props.isHidden && !props.exiting ? 0 : 1)};
      cursor: ${props => props.isBackButton && 'pointer'};

      &:active {
         color: ${props => props.isBackButton && color.redAlpha[2]};
      }
   }
`;

const Title = styled.h1`
   margin: 0;
   transition: all 0.3s ease-in-out;
`;

const TitleButton = styled.button`
   background: transparent;
   border: none;
   padding: 0;
   margin: 0;
   font-family: inherit;
   text-align: left;
   cursor: pointer;

   &:focus {
      outline: 2px solid ${color.blue[4]};
      outline-offset: 2px;
   }
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      popView: () => dispatch(popView()),
   };
};

const TitleStack = connect(mapStateToProps)(({ stack, exiting, onClick }) => {
   return stack.map(({ name, title, props }, index) => {
      const isHidden = index < stack.length - 2;
      const isBackButton = index === stack.length - 2;
      const isTitle = index === stack.length - 1;

      return (
         index >= stack.length - 3 && (
            <TitleContainer
               key={`title-${name}`}
               isHidden={isHidden}
               isBackButton={isBackButton}
               exiting={exiting}
               isTitle={isTitle}>
               {!props.hideTitle && (
                  isBackButton ? (
                     <TitleButton
                        onClick={onClick}
                        aria-label={`Go back to ${title || name}`}
                     >
                        <Title as="span">
                           {title || name}
                        </Title>
                     </TitleButton>
                  ) : (
                     <Title>
                        {title || name}
                     </Title>
                  )
               )}
            </TitleContainer>
         )
      );
   });
});

const BackButton = connect(
   mapStateToProps,
   mapDispatchToProps,
)(({ viewState, popView }) => {
   const { stack } = viewState;
   const showChevron = stack.length > 1;

   return (
      <ChevronButton
         isShown={showChevron}
         onClick={showChevron ? popView : null}
         aria-label="Go back"
         tabIndex={showChevron ? 0 : -1}
      >
         <Icon
            name="chevron-left"
            size={38}
            color={color.red[4]}
         />
      </ChevronButton>
   );
});

class Header extends Component {
   constructor(props) {
      super(props);
      const { viewState } = props;
      const { stack } = viewState;

      this.state = {
         stack,
         hideTitle: props.hideTitle,
         newStack: null,
         exiting: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { stack } = viewState;
      const exiting = stack.length < prevState.stack.length;

      return {
         stack: exiting ? prevState.stack : stack,
         exiting,
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { stack } = viewState;

      setTimeout(() => {
         this.setState({
            stack,
            exiting: false,
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.exiting) {
         this.animateBack();
      }
   }

   render() {
      const { stack, exiting } = this.state;
      const currentView = stack[stack.length - 1];
      const { hideTitle } = currentView.props;

      return (
         <Container hideTitle={hideTitle && !exiting}>
            <BackButton />
            <TitleStack
               stack={stack}
               exiting={exiting}
               onClick={this.props.popView}
            />
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Header);
