import React, { useEffect, useContext, useState } from "react";
import { Button } from "../../components/button/Button";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Modal } from "../../components/modal/Modal";
import { Select } from "../../components/select/Select";
import Input from "../../components/input/Input";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Card } from "../../components/card/Card";

import savingsSvg from "../../assets/bankAccount/savings.svg";
import addBankAccountSvg from "../../assets/bankAccount/add-bank-account.svg";
import agencySvg from "../../assets/agencyPortfolio/agency.svg";
import fcmbLogo from "../../assets/bankAccount/fcmb-logo.png";
import more from "../../assets/bankAccount/more-outline.svg";

import "./BankAccount.css";

const BankAccount = () => {
  const { dispatch } = useContext(store);
  const [modalState, setModalState] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [account, setAccount] = useState(false);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Bank Accounts" });
  }, []);

  const onButtonClick = () => {
    setAccount(!account);
    console.log(account);
  };

  const bankAccountExist = () => {
    return (
      <>
        <div className="bank-account-header flex">
          <img src={agencySvg} alt="no-image" className="agency-svg" />
          <div className="header-details flex">
            <p>Bank Accounts</p>
            <p>Manage bank accounts and payment channels</p>
          </div>
        </div>
        <div className="grid grid-3">
          <Card>
            <div className="more">
              <img src={more} alt="more" />
            </div>
            <div className="card">
              <div className="card-details">
                <p className="name">Bukola Hameedah Adesola</p>
                <p className="bank-account-number">0059800992</p>
                <p className="bank">First City Monument Bank</p>
              </div>
              <div className="card-image">
                <img src={fcmbLogo} alt="bank-logo" className="bank-logo" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="more">
              <img src={more} alt="more" />
            </div>
            <div className="card">
              <div className="card-details">
                <p className="name">Bukola Hameedah Adesola</p>
                <p className="bank-account-number">0059800992</p>
                <p className="bank">First City Monument Bank</p>
              </div>
              <div className="card-image">
                <img src={fcmbLogo} alt="bank-logo" className="bank-logo" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="more">
              <img src={more} alt="more" />
            </div>
            <div className="card">
              <div className="card-details">
                <p className="name">Bukola Hameedah Adesola</p>
                <p className="bank-account-number">0059800992</p>
                <p className="bank">First City Monument Bank</p>
              </div>
              <div className="card-image">
                <img src={fcmbLogo} alt="bank-logo" className="bank-logo" />
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="flex account-header">
        <Button onClick={onButtonClick}>Switch</Button>
        <Button onClick={() => setModalState(true)} className="add-account">
          Add Bank Account
        </Button>
      </div>
      {account ? (
        bankAccountExist()
      ) : (
        <div className="add-account-svg">
          <img src={savingsSvg} alt="add-account" className="savings-svg" />
          <p>No bank account added</p>
        </div>
      )}
      <Modal
        className="add-account-modal"
        visible={modalState}
        onClose={() => setModalState(false)}
      >
        <div className="flex">
          <div className="picture">
            <img
              src={addBankAccountSvg}
              alt="add-bank-account"
              className="account-svg"
            />
          </div>
          <div className="account-details">
            <div className="account-info">
              <h3>Add Bank Accounts</h3>
              <p>Add a new bank account to manage transactions</p>
            </div>
            <div className="bank-name">
              <p>Bank Name</p>
              <Select
                placeholder="Select a bank"
                optionList={[
                  { title: "FCMB", value: "FCMB" },
                  { title: "GTBANK", value: "GTBANK" },
                  { title: "JAIZ BANK", value: "JAIZ BANK" }
                ]}
              />
            </div>
            <div className="account-number">
              <p>Account Number</p>
              <Input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
              />
            </div>
            <Checkbox label="Set as default bank account" />
            <Button className="save-account">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BankAccount;
