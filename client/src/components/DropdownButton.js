import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownButton extends React.Component {
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
    this.buttonLabel = props.label
    this.type = parseInt(props.type)
  }
  render() {
    this.toggle = this.toggle.bind(this);
    return (
      <div>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        />

        <ButtonDropdown
          isOpen={this.state.btnLg}
          toggle={() => {
            if (this.type === 1 || this.type === 2){
              this.setState({
                  btnLg: !this.state.btnLg
                  });
            }
            else if (this.type === 3){
              alert('Add an action status to this')
            }
            else if (this.type === 4){
              alert('Add action status to this')
            }
            else if (this.type === 5){
              alert('Add action status to this')
            }
          }}
        >
            { (this.type === 1)
              ? <div class="mt-2 col-md-12">
                  <DropdownToggle caret size='med'>{this.buttonLabel}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <div onClick={() => alert('Add action status to this')}> {/*ADD ACTION EVENT HERE*/}
                        Soft Abort
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={() => alert('Add action status to this')}> {/*ADD ACTION EVENT HERE*/}
                        Hard Abort
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </div>
              : <div></div>
            }
            { (this.type === 2)
              ? <div class="mt-2 col-md-12">
                  <DropdownToggle caret size='med'>{this.buttonLabel}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <div onClick={() => alert('Add action status to this')}> {/*ADD ACTION EVENT HERE*/}
                        Override
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={() => alert('Add action status to this')}> {/*ADD ACTION EVENT HERE*/}
                        Solenoid Valve Actuation
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={() => alert('Add action status to this')}> {/*ADD ACTION EVENT HERE*/}
                        Ball Valve Actuation
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </div>
              : <div></div>
            }
            { (this.type === 3 || this.type === 4 || this.type === 5)
              ? <div class="mt-2 col-md-12">
                  <DropdownToggle>{this.buttonLabel}</DropdownToggle>
                </div>
              : <div></div>
            }
        </ButtonDropdown>
      </div>
    );
  }
}
export default DropdownButton;
