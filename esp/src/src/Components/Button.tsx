import * as React from "react";
import { render } from "react-dom";
import Button from '@material-ui/core/Button/Button';

export interface IProps{
    name: string
}

export class CustomButton extends React.Component<IProps, {}> {
    render () {
        return <Button variant="contained" color="primary">{this.props.name}</Button>
    }
  }
  
  
  export function addName(target: HTMLElement, props: IProps) {
    render(<CustomButton name={props.name} />, target);
}