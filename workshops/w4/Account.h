/***********************************************************************
// OOP244 Workshop 4 lab: Account Module
//
// File    Account.h
// Version 1.0
// Date    2025/06/03
// Author  Aashrawat Shrestha..
// Description:
//   Models a simple bank account with name, number, and balance.
//
// Revision History
// -----------------------------------------------------------
// Name            Date            Reason
// Aashrawat S.    2025/10/08      Completed all missing operator overloads
//
***********************************************************************/
#ifndef SENECA_ACCOUNT_H_
#define SENECA_ACCOUNT_H_

#include <iostream>

namespace seneca {
    const int NameMaxLen = 30;

    class Account {
        double m_balance{};
        int m_number{};
        char m_holderName[NameMaxLen + 1]{};

        void cpyName(const char* src);
        bool isValidNumber(int number) const;

    public:
        // Constructors
        Account(const char* holderName = nullptr);
        Account(const char* holderName, int number, double balance);

        // Display
        std::ostream& display() const;

        // Type conversion operators
        operator bool() const;
        operator int() const;
        operator double() const;
        operator const char* () const;

        // Index operators
        char& operator[](int index);
        const char operator[](int index) const;

        // Assignment operators
        Account& operator=(int accNumber);
        Account& operator=(double balance);

        // Binary member operators
        Account& operator+=(double amount);
        Account& operator-=(double amount);
        Account& operator<<(Account& other);
        Account& operator>>(Account& other);

        // Unary operators
        bool operator~() const;
        Account& operator++();       // prefix ++
        Account operator++(int);     // postfix ++
        Account& operator--();       // prefix --
        Account operator--(int);     // postfix --
    };
}

#endif // SENECA_ACCOUNT_H_
