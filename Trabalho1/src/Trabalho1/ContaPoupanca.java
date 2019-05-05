/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Trabalho1;

import javax.swing.JOptionPane;

/**
 *
 * @author João Victor
 */
public class ContaPoupanca extends Contas {

    public void reajustar(double taxa) {
        setSaldo(getSaldo() * (taxa) / 100);
    }

    public void reajustar() {
        setSaldo(getSaldo() * (0.1));
    }

    public void tipoConta2() {
        JOptionPane.showMessageDialog(null, "Tipo da conta: Poupança");
    }
}
