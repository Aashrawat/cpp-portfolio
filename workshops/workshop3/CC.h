#ifndef SENECA_CC_H_
#define SENECA_CC_H_

#include <iostream>

namespace seneca {
    class CC {
        char* m_name{};
        unsigned long long m_number{};
        short m_cvv{};
        short m_expMon{};
        short m_expYear{};

        // Private helpers
        void aloCopy(const char* name);
        void deallocate();
        bool validate(const char* name,
            unsigned long long cardNo,
            short cvv,
            short expMon,
            short expYear) const;
        void display(const char* name,
            unsigned long long number,
            short expYear,
            short expMon,
            short cvv) const;
        void prnNumber(unsigned long long no) const;

    public:
        // Constructors / Destructor
        CC();
        CC(const char* cc_name,
            unsigned long long cc_no,
            short cvv,
            short expMon = 12,
            short expYear = 26);
        ~CC();

        // Setters
        void set();
        void set(const char* cc_name,
            unsigned long long cc_no,
            short cvv,
            short expMon,
            short expYear);

        // Getters
        bool isEmpty() const;
        void display() const;
    };
}

#endif // !SENECA_CC_H_