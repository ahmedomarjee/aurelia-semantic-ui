/* -*- javascript -*- */
"use strict";

/**
 * Button - http://semantic-ui.com/elements/button.html
 */

import {constants} from '../constants';
import {SemanticUIElement, SemanticUIAttribute, bindableToggle, bindableEnum} from '../ui-base';
import {
	customAttribute,
	customElement,
	inject,
	child,
	containerless,
	bindable
} from 'aurelia-framework';


@customElement( `${constants.elementPrefix}button` )
export class SemanticUIButtonElement extends SemanticUIElement {

	@bindable icon;
	@bindableEnum( ...constants.VALID_COLORS ) color;
	@bindableEnum( ...constants.VALID_SIZES ) size;
	@bindableToggle disabled;
	@bindableToggle primary;
	@bindableToggle secondary;
	@bindableToggle basic;
	@bindable animated;
	@bindable labeled;


	bind( ...args ) {
		this.setAnimatedClasses( this.animated );
		this.setLabeledClasses( this.labeled );
	}


	animatedChanged( oldValue, newValue ) {
		this.setAnimatedClasses( newValue );
	}


	labeledChanged( oldValue, newValue ) {
		this.setLabeledClasses( newValue );
	}


	setAnimatedClasses( animated ) {
		if ( animated !== null && animated !== false ) {
			this.addCssClasses( 'animated' );
			if ( animated !== '' ) {
				this.addCssClasses( animated );
			}
		}
	}

	setLabeledClasses( labeled ) {
		if ( labeled !== null && labeled !== false ) {
			if ( labeled === 'left' || (labeled !== 'right' && this.icon) ) {
				this.addCssClasses( 'left' );
			} else {
				this.addCssClasses( 'right' );
			}
			this.addCssClasses( 'labeled' );
		}
	}

}


@customAttribute( `${constants.attributePrefix}button` )
export class SemanticUIButtonAttribute extends SemanticUIAttribute {

	@bindable icon;
	@bindableEnum( ...constants.VALID_COLORS ) color;
	@bindableEnum( ...constants.VALID_SIZES ) size;
	@bindableToggle disabled;

	@child( 'i.ui.icon' ) iconElement;


	bind( ...args ) {
		super.bind( ...args );
		if ( this.icon ) {
			this.logger.debug( `Adding 'icon' to the list of classes.` );
			this.element.classList.add('icon');
		}
	}


	attached() {
		// Inject the icon if it's set but not already there
		if ( this.icon && !this.iconElement ) {
			this.logger.debug( `Creating a ${this.icon} icon for `, this.element );
			let iconNode = document.createElement( 'i' );
			iconNode.classList.add( 'ui', 'icon' );
			iconNode.classList.add( ...this.icon.split(' ') );
			this.element.insertBefore( iconNode, this.element.firstChild );
			this.iconElement = iconNode;
		}
	}


	iconChanged( newValue, oldValue ) {
		if ( this.iconElement ) {
			this.logger.debug( `Swapping icon of ${this.iconElement} to ${newValue} from ${oldValue}` );
			if ( oldValue ) { this.iconElement.classList.remove(...oldValue.split(' ')); }
			if ( newValue ) { this.iconElement.classList.add(...newValue.split(' ')); }
		}
	}

}


@customElement( `${constants.elementPrefix}buttons` )
export class SemanticUIButtonsElement extends SemanticUIElement {}

@customAttribute( `${constants.attributePrefix}buttons` )
export class SemanticUIButtonsAttribute extends SemanticUIAttribute {
}

