#include<iostream>
using namespace std;
//constant variables
constexpr int N = 8;
constexpr int factorial(int i)//constant function
{
	return i > 1 ? i * factorial(i - 1) : 1;

}

int main() {
	cout << N << "!=" << factorial(N) << endl;

}
