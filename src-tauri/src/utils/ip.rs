use std::net::IpAddr;

pub fn get_ipv4() -> Result<IpAddr, String> {
    local_ip_address::local_ip().map_err(|e| e.to_string())
}

pub fn get_ipv6() -> Result<IpAddr, String> {
    local_ip_address::local_ipv6().map_err(|e| e.to_string())
}

#[cfg(test)]
mod unit_test {
    #[test]
    fn get_local_ip() {
        // let my_local_ip = local_ip_address::local_ip().unwrap();
        // println!("This is my local IP address: {:?}", my_local_ip);

        // let my_local_ip = local_ip_address::local_ipv6().unwrap();
        // println!("This is my local IP address: {:?}", my_local_ip);

        let network_interfaces = local_ip_address::list_afinet_netifas().unwrap();
        for (name, ip) in network_interfaces.iter() {
            println!("{}:\t{:?}", name, ip);
        }
    }
}