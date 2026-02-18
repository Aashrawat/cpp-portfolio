/***********************************************************************
// OOP244 Workshop 4 lab: Account Module
//
// File    Account.cpp
// Version 1.0
// Date    2025/06/03
// Author  Aashrawat Shrestha..
// Description:
//   Implements all member functions and operators for the Account class.
//
// Revision History
// -----------------------------------------------------------
// Name            Date            Reason
// Aashrawat S.    2025/10/08      Completed full implementation
//
***********************************************************************/
#include <iostream>
#include <cstring>
#include "Account.h"
using namespace std;

namespace seneca {

    /********************
     * Helper Functions *
     ********************/
    void Account::cpyName(const char* src) {
        int i;
        for (i = 0; src && src[i] && i < NameMaxLen; i++) {
            m_holderName[i] = src[i];
        }
        m_holderName[i] = '\0';
    }

    bool Account::isValidNumber(int number) const {
        return number >= 10000 && number <= 99999;
    }

    /********************
     * Constructors     *
     ********************/
    Account::Account(const char* holderName) {
        m_holderName[0] = '\0';
        m_number = -1;
        m_balance = 0.0;

        if (holderName && holderName[0]) {
            cpyName(holderName);
            m_number = 0; // new account
        }
    }

    Account::Account(const char* holderName, int number, double balance) {
        m_holderName[0] = '\0';
        m_number = -1;
        m_balance = 0.0;

        if (holderName && holderName[0] && isValidNumber(number) && balance >= 0) {
            cpyName(holderName);
            m_number = number;
            m_balance = balance;
        }
    }

    /********************
     * Display          *
     ********************/
    std::ostream& Account::display() const {
        cout.setf(ios::fixed);
        cout.precision(2);
        cout.fill(' ');

        if (*this) {  // valid
            cout << " ";
            cout.setf(ios::left);
            cout.width(NameMaxLen);
            cout << m_holderName;
            cout.unsetf(ios::left);
            cout << " | ";
            cout.width(5);
            cout << m_number;
            cout << " | ";
            cout.width(12);
            cout.setf(ios::right);
            cout << m_balance;
            cout.unsetf(ios::right);
            cout << " ";
        }
        else if (~*this) {  // new account
            cout << " ";
            cout.setf(ios::left);
            cout.width(NameMaxLen);
            cout << m_holderName;
            cout.unsetf(ios::left);
            cout << " |  NEW  |         0.00 ";
        }
        else {  // bad
            cout << " Bad Account                    | ----- | ------------ ";
        }

        return cout;
    }

    /********************
     * Type Conversions *
     ********************/
    Account::operator bool() const {
        return m_number > 0 && isValidNumber(m_number) && m_balance >= 0 && m_holderName[0] != '\0';
    }

    Account::operator int() const {
        return m_number;
    }

    Account::operator double() const {
        return m_balance;
    }

    Account::operator const char* () const {
        return m_holderName;
    }

    /********************
     * Index Operators  *
     ********************/
    char& Account::operator[](int index) {
        if (index < 0) index = 0;
        return m_holderName[index % (NameMaxLen + 1)];
    }

    const char Account::operator[](int index) const {
        if (index < 0) index = 0;
        return m_holderName[index % (NameMaxLen + 1)];
    }

    /********************
     * Assignment Ops   *
     ********************/
    Account& Account::operator=(int accNumber) {
        if (~*this) {  // only if new
            if (isValidNumber(accNumber)) {
                m_number = accNumber;
            }
            else {
                m_number = -1;
                m_balance = 0.0;
                m_holderName[0] = '\0';
            }
        }
        return *this;
    }

    Account& Account::operator=(double balance) {
        if (balance >= 0) {
            m_balance = balance;
        }
        else {
            m_number = -1;
            m_balance = 0.0;
            m_holderName[0] = '\0';
        }
        return *this;
    }

    /********************
     * Binary Operators *
     ********************/
    Account& Account::operator+=(double amount) {
        if (*this && amount > 0)
            m_balance += amount;
        return *this;
    }

    Account& Account::operator-=(double amount) {
        if (*this && amount > 0 && m_balance >= amount)
            m_balance -= amount;
        return *this;
    }

    Account& Account::operator<<(Account& other) {
        if (this != &other && *this && other) {
            m_balance += other.m_balance;
            other.m_balance = 0.0;
        }
        return *this;
    }

    Account& Account::operator>>(Account& other) {
        if (this != &other && *this && other) {
            other.m_balance += m_balance;
            m_balance = 0.0;
        }
        return *this;
    }

    /********************
     * Unary Operators  *
     ********************/
    bool Account::operator~() const {
        return m_number == 0 && m_holderName[0] != '\0';
    }

    Account& Account::operator++() {
        if (*this) m_balance += 1.0;
        return *this;
    }

    Account Account::operator++(int) {
        Account temp = *this;
        if (*this) m_balance += 1.0;
        return temp;
    }

    Account& Account::operator--() {
        if (*this && m_balance >= 1.0) m_balance -= 1.0;
        return *this;
    }

    Account Account::operator--(int) {
        Account temp = *this;
        if (*this && m_balance >= 1.0) m_balance -= 1.0;
        return temp;
    }

} // namespace seneca
