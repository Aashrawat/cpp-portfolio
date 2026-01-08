
#ifndef SENECA_IO_H
#define SENECA_IO_H
#include<cstdio>
#include<cstring>

namespace seneca {

	struct PhoneRec {
		char firstName[15];
		char lastName[30];
		long long int phoneNum;
	};
	void read(char* name);
	void print(long long int phoneNum);
	void print(PhoneRec& pr, size_t& rn, const char* fil = nullptr);
	bool read(PhoneRec& pr, FILE* fp);
	void print(PhoneRec* arrpr[], size_t sz, const char* fil = nullptr);
	void setPointers(PhoneRec* arrPtr[], PhoneRec arr[], int size);
	void sort(PhoneRec* arrPtr[], size_t size, bool byLastName);
}
#endif 

